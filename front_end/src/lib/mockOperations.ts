import { batches as defaultBatches } from '../mocks/admin';
import { dailyAppointments, patients as defaultPatients, type QueueStatus } from '../mocks/employee';

export interface StoredPatient { id:string; name:string; cpf:string; birth:string; phone:string; lastVaccine:string; status:string }
export interface ApplicationRecord { id:string; protocol:string; patientId:string; patientName:string; vaccineId:string; vaccineName:string; batch:string; dose:string; date:string; time:string; type:string; route:string; site:string; professional:string; createdAt:string }

function read<T>(key:string,fallback:T):T { try{return JSON.parse(localStorage.getItem(key)??'null')??fallback}catch{return fallback} }
function write<T>(key:string,value:T){localStorage.setItem(key,JSON.stringify(value))}

export function getQueueStatuses():Record<string,QueueStatus>{return read('orbe-queue-statuses',Object.fromEntries(dailyAppointments.map(item=>[item.id,item.status])))}
export function saveQueueStatuses(statuses:Record<string,QueueStatus>){write('orbe-queue-statuses',statuses)}
export function getPatients():StoredPatient[]{return read('orbe-employee-patients',defaultPatients.map(patient=>({...patient,status:'Ativo'})))}
export function savePatients(patients:StoredPatient[]){write('orbe-employee-patients',patients)}
export function getApplications():ApplicationRecord[]{return read('orbe-applications',[])}

export function registerApplication(input:Omit<ApplicationRecord,'id'|'protocol'|'createdAt'>):ApplicationRecord{
 const timestamp=Date.now();const record:ApplicationRecord={...input,id:`app-${timestamp}`,protocol:`ORB-APP-${String(timestamp).slice(-8)}`,createdAt:new Date().toISOString()};
 write('orbe-applications',[record,...getApplications()]);
 const patients=getPatients().map(patient=>patient.id===record.patientId?{...patient,lastVaccine:`${record.vaccineName} · ${record.date.split('-').reverse().join('/')}`}:patient);savePatients(patients);
 const fallback=defaultBatches.map(batch=>({...batch,quantity:String(batch.quantity)}));const batches=read<Record<string,string>[]>('orbe-admin-batches',fallback);const updated=batches.map(batch=>batch.number===record.batch?{...batch,quantity:String(Math.max(0,Number(batch.quantity)-1))}:batch);write('orbe-admin-batches',updated);
 const audit=read<Record<string,string>[]>('orbe-runtime-audit',[]);audit.unshift({date:new Date().toLocaleString('pt-BR'),user:record.professional,action:'Registrou aplicação',resource:record.protocol,ip:'10.0.0.24'});write('orbe-runtime-audit',audit);
 return record;
}
