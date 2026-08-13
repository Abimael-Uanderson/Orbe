export interface Vaccine { id:string; name:string; manufacturer:string; description:string; price:number; category:string; doses:string; age:string; available:boolean }
export interface Dependent { id:string; name:string; relationship:string; birthDate:string; age:string; cpf:string }
export interface Insurance { id:string; company:string; plan:string; cardNumber:string; holder:string; validUntil:string; active:boolean }

export const vaccines: Vaccine[] = [
  { id:'vac-001', name:'Influenza tetravalente', manufacturer:'Sanofi Pasteur', description:'Proteção anual contra quatro cepas do vírus influenza.', price:129.9, category:'Respiratórias', doses:'Dose anual', age:'A partir de 6 meses', available:true },
  { id:'vac-002', name:'Hepatite B', manufacturer:'Instituto Butantan', description:'Previne a infecção pelo vírus da hepatite B e suas complicações.', price:98, category:'Calendário adulto', doses:'Esquema de 3 doses', age:'Todas as idades', available:true },
  { id:'vac-003', name:'Febre amarela', manufacturer:'Fiocruz', description:'Proteção contra a febre amarela para residentes e viajantes.', price:115, category:'Viajantes', doses:'Dose única', age:'De 9 meses a 59 anos', available:true },
  { id:'vac-004', name:'Herpes-zóster', manufacturer:'GSK', description:'Reduz o risco de herpes-zóster e neuralgia pós-herpética.', price:789, category:'Adulto 50+', doses:'Esquema de 2 doses', age:'A partir de 50 anos', available:false },
  { id:'vac-005', name:'HPV nonavalente', manufacturer:'MSD', description:'Proteção contra nove tipos do papilomavírus humano.', price:899, category:'Adolescentes e adultos', doses:'2 ou 3 doses', age:'De 9 a 45 anos', available:true },
  { id:'vac-006', name:'Pneumocócica 20', manufacturer:'Pfizer', description:'Previne doenças causadas por vinte sorotipos de pneumococo.', price:520, category:'Respiratórias', doses:'Conforme indicação', age:'Adultos e idosos', available:true }
];

export const dependents: Dependent[] = [
  { id:'dep-001', name:'Lucas Souza', relationship:'Filho', birthDate:'14/09/2017', age:'8 anos', cpf:'***.***.***-42' },
  { id:'dep-002', name:'Clara Souza', relationship:'Filha', birthDate:'02/05/2022', age:'4 anos', cpf:'***.***.***-08' }
];

export const insurances: Insurance[] = [
  { id:'ins-001', company:'Saúde Essencial', plan:'Nacional Plus', cardNumber:'4521 0098 7731', holder:'Mariana Souza', validUntil:'12/2027', active:true },
  { id:'ins-002', company:'Vida Plena', plan:'Regional Enfermaria', cardNumber:'8820 1145 0092', holder:'Mariana Souza', validUntil:'08/2026', active:false }
];
