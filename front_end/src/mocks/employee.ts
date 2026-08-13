export type QueueStatus='confirmed'|'waiting'|'in_service'|'completed';
export interface DailyAppointment{id:string;time:string;patient:string;cpf:string;vaccine:string;dose:string;room:string;status:QueueStatus}
export const dailyAppointments:DailyAppointment[]=[
 {id:'day-001',time:'08:00',patient:'João Almeida',cpf:'***.***.***-10',vaccine:'Influenza tetravalente',dose:'Dose anual',room:'Sala 01',status:'completed'},
 {id:'day-002',time:'08:30',patient:'Beatriz Lima',cpf:'***.***.***-32',vaccine:'HPV nonavalente',dose:'2ª dose',room:'Sala 02',status:'waiting'},
 {id:'day-003',time:'09:00',patient:'Carlos Nunes',cpf:'***.***.***-54',vaccine:'Hepatite B',dose:'1ª dose',room:'Sala 01',status:'in_service'},
 {id:'day-004',time:'09:30',patient:'Mariana Souza',cpf:'***.***.***-27',vaccine:'Influenza tetravalente',dose:'Dose anual',room:'Sala 02',status:'confirmed'},
 {id:'day-005',time:'10:00',patient:'Lucas Souza',cpf:'***.***.***-42',vaccine:'Febre amarela',dose:'Dose única',room:'Sala 01',status:'confirmed'}
];
export const patients=[
 {id:'pat-01',name:'Mariana Souza',cpf:'123.456.789-27',birth:'18/05/1990',phone:'(71) 99999-2211',lastVaccine:'COVID-19 · 18/03/2026'},
 {id:'pat-02',name:'João Almeida',cpf:'987.654.321-10',birth:'03/11/1978',phone:'(71) 98888-1122',lastVaccine:'Influenza · 22/07/2026'},
 {id:'pat-03',name:'Beatriz Lima',cpf:'456.789.123-32',birth:'29/01/2011',phone:'(71) 97777-2233',lastVaccine:'HPV · 17/01/2026'},
 {id:'pat-04',name:'Carlos Nunes',cpf:'789.123.456-54',birth:'07/08/1985',phone:'(71) 96666-3344',lastVaccine:'Hepatite B · 05/02/2026'}
];
