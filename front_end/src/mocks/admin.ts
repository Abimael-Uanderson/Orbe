export const adminUsers=[
 {id:'usr-01',name:'Mariana Souza',email:'mariana@exemplo.com',role:'Paciente',status:'Ativo',lastAccess:'Hoje, 20:42'},
 {id:'usr-02',name:'Ana Ribeiro',email:'funcionario@orbe.com',role:'Funcionário',status:'Ativo',lastAccess:'Hoje, 19:58'},
 {id:'usr-03',name:'Roberto Mendes',email:'roberto@orbe.com',role:'Administrador',status:'Ativo',lastAccess:'Ontem, 17:20'},
 {id:'usr-04',name:'Juliana Costa',email:'juliana@exemplo.com',role:'Paciente',status:'Inativo',lastAccess:'10/07/2026'}
];
export const batches=[
 {id:'lot-01',number:'LT-260701',vaccine:'Influenza tetravalente',manufacturer:'Sanofi Pasteur',expires:'03/2027',quantity:42,status:'Regular'},
 {id:'lot-02',number:'LT-260615',vaccine:'Hepatite B',manufacturer:'Instituto Butantan',expires:'12/2026',quantity:18,status:'Atenção'},
 {id:'lot-03',number:'LT-260502',vaccine:'Febre amarela',manufacturer:'Fiocruz',expires:'09/2026',quantity:7,status:'Crítico'},
 {id:'lot-04',number:'LT-260418',vaccine:'HPV nonavalente',manufacturer:'MSD',expires:'08/2027',quantity:28,status:'Regular'}
];
export const movements=[
 {id:'mov-01',date:'22/07/2026 · 09:12',batch:'LT-260701',type:'Saída por aplicação',quantity:'−1',user:'Ana Ribeiro'},
 {id:'mov-02',date:'22/07/2026 · 08:04',batch:'LT-260615',type:'Saída por aplicação',quantity:'−1',user:'Ana Ribeiro'},
 {id:'mov-03',date:'21/07/2026 · 15:30',batch:'LT-260701',type:'Entrada de remessa',quantity:'+30',user:'Roberto Mendes'},
 {id:'mov-04',date:'21/07/2026 · 11:18',batch:'LT-260502',type:'Ajuste de inventário',quantity:'−2',user:'Roberto Mendes'}
];
export const auditEvents=[
 {date:'22/07/2026 · 09:14',user:'Ana Ribeiro',action:'Registrou aplicação',resource:'Aplicação APP-20260722-008',ip:'10.0.0.24'},
 {date:'22/07/2026 · 08:32',user:'Ana Ribeiro',action:'Atualizou atendimento',resource:'Agendamento AGE-0042',ip:'10.0.0.24'},
 {date:'21/07/2026 · 15:30',user:'Roberto Mendes',action:'Registrou entrada',resource:'Lote LT-260701',ip:'10.0.0.10'},
 {date:'21/07/2026 · 14:05',user:'Roberto Mendes',action:'Alterou usuário',resource:'Usuário USR-0031',ip:'10.0.0.10'}
];
