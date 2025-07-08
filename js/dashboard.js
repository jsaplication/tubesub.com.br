

// function session(){
//     $.post(server()+"api/",{
//       token: getToken(),
//       route: 'auth',
//       type:'session',
//       route: 'auth'
//     }, function(resp){
//       // console.log('session', resp);

//       if(resp[0].status != "error"){
//         setToken(resp[0].token);
//         setEmail(resp[0].email);
      
//         if(resp[0].pedidos.length == 0){
//               console.log('sem pedidos')

//             // $(".expired-notification").hide();
//             $(".active-notification").show();
            
//         }else{
//           console.log('sem pedidos')
//             $(".active-notification").hide();
//         }


//         if(resp[0].verification == 'true'){
//            //$("userverifild").text("Verificado")
//         }else{
//            //$("userverifild").text("")
//         }


//         $("username").text(resp[0].nome)
//         $("useremail").text(resp[0].email)
       
//         if(resp[0].status_expiration === 'expired' && resp[0].pedidos.length != 0){

//           $(".expired-notification").show();

//         }else{
//            $(".expired-notification").hide();

//         }

//         $(".card-pedidos1").html('');
//         $(".historico_pedidos").html('');

//         var contecard = 1;
//         const pedidos = resp[0].pedidos;
//         pedidos.sort((a, b) => {
//           if (a.ativo !== b.ativo) {
//             // Prioriza 'ativo' igual a 'true' sobre 'ativo' igual a 'false'
//             return a.ativo === 'true' ? -1 : 1; // 'true' vem antes de 'false'
//           }
//           // Dentro dos itens com o mesmo valor de 'ativo', ordena por id_pedido em ordem decrescente
//           return b.id_pedido - a.id_pedido; // Ordena por id_pedido em ordem decrescente
//         });

//         //cards
//         $.each(pedidos, function(k,v){

//             var status_pg;
//             var status_pg_name;
//             var status_pg_desc;
//             var status_pg_color;
//             var status_card;
//             var tag;
//             var tag2;
           

//             if(v.status_pagamento == 'pago'){
//               status_pg = 'bg-success';
//               status_pg_name = 'Pago';
//               status_pg_desc = 'Pagamento Aprovado via Pix';
//               status_pg_color = 'green';

//               if(v.status_pix != 'expired' && v.ativo === 'true'){
//                 status_card = 'border: 2px solid green !important';
//                 tag = 'tagname';
//                 tag2 = 'movecard'
//               }else{
//                 status_card = '';
//                 tag = '';
//                 tag2 = '';
//               }
              
//             }else if(v.status_pagamento == 'pendente' && v.status_pix != 'expired'){
//               status_pg = 'bg-warning';
//               status_pg_name = 'Pendente';
//               status_pg_desc = 'Pagamento Pendente';
//               status_pg_color = 'yellow';
//               status_card = '';
//               tag = '';
//               tag2 = '';
//             }else if(v.status_pix == 'expired' || v.status_pagamento == 'pendente'){
//               status_pg = 'bg-danger'
//               status_pg_name = 'Expirado';
//               status_pg_desc = 'Pagamento Expirado';
//               status_pg_color = 'red';
//               status_card = '';
//               tag = '';
//               tag2 = '';
//             }else{
//               status_pg  = '';
//               status_pg_name = '';
//               status_pg_desc = '';
//               status_pg_color = '';
//               status_card = '';
//               tag = '';
//               tag2 = '';
//               $("statusPlano").text("");
//             }
//             var cardPedidos = `<div class="col-lg-4 col-md-6 col-12 mt-4 pt-2 cards1 ${tag2}">
//                             <div class="card border-0 bg-light rounded shadow ${tag}" style="${status_card}">
//                                 <div class="card-body p-4">
//                                     <span class="badge rounded-pill ${status_pg} float-md-end mb-3 mb-sm-0">${status_pg_name}</span>
//                                     <h5>Assinatura: ${v.plano}</h5>
//                                     <div class="mt-3">
//                                         <span class="text-muted d-block"><i class="fa fa-calendar" aria-hidden="true"></i> Expira dia: ${v.data_expiration}</span>
//                                         <span class="text-muted d-block"><i class="fa fa-map-marker" aria-hidden="true"></i> ${status_pg_desc}</span>
//                                         <span class="text-muted d-block"><i class="fa fa-dollar" aria-hidden="true"></i> ${formatMoeda(Number(v.valor))}</span>
//                                     </div>
                                    
//                                     <div class="mt-3">
//                                         <a href="javascriot:void(0)" class="btn btn-primary">Ver Vetalhes</a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>`;

//             if(contecard < 4){
//               $(".card-pedidos1").append(cardPedidos);  // Adiciona o item
//               contecard++;  // Incrementa o contador
//             }else{
//               // $(".card-pedidos1").append(cardPedidos);
//             }
  
//         });
  

//         $.each(resp[0].pedidos, function(k,v){

//             var status_pg;
//             var status_pg_name;
//             var status_pg_desc;
//             var status_pg_color;
//             var status_card;
//             var tag;
//             var tag2;
           

//             if(v.status_pagamento == 'pago'){
//               status_pg = 'bg-success';
//               status_pg_name = 'Pago';
//               status_pg_desc = 'Pagamento Aprovado via Pix';
//               status_pg_color = 'green';

//               if(v.status_pix != 'expired' && v.ativo === 'true'){
//                 status_card = 'border: 2px solid green !important';
//                 tag = 'tagname';
//                 tag2 = 'movecard'
//               }else{
//                 status_card = '';
//                 tag = '';
//                 tag2 = '';
//               }
              
//             }else if(v.status_pagamento == 'pendente' && v.status_pix != 'expired'){
//               status_pg = 'bg-warning';
//               status_pg_name = 'Pendente';
//               status_pg_desc = 'Pagamento Pendente';
//               status_pg_color = 'yellow';
//               status_card = '';
//               tag = '';
//               tag2 = '';
//             }else if(v.status_pix == 'expired' || v.status_pagamento == 'pendente'){
//               status_pg = 'bg-danger'
//               status_pg_name = 'Expirado';
//               status_pg_desc = 'Pagamento expirado';
//               status_pg_color = 'red';
//               status_card = '';
//               tag = '';
//               tag2 = '';
//             }else{
//               status_pg  = '';
//               status_pg_name = '';
//               status_pg_desc = '';
//               status_pg_color = '';
//               status_card = '';
//               tag = '';
//               tag2 = '';
//               $("statusPlano").text("");
//             }
           
//             var historico_p = `<tr class="align-middle">
//                                 <td>
//                                     <div class="d-flex align-items-center">
//                                         <img src="icones/user-p.png" class="avatar sm rounded-pill me-3 flex-shrink-0" alt="Customer">
//                                         <div>
//                                             <div class="h6 mb-0 lh-1" style="padding-left: 10px"> ${resp[0].nome}</div>
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td>${resp[0].email}</td>
//                                 <td> <span class="d-inline-block align-middle">${v.plano}</span></td>
//                                 <td><span style="color: ${status_pg_color}">${status_pg_name}</span></td>
//                                 <td><span>${v.contas}</span></td>
//                                 <td>${formatMoeda(Number(v.valor))}</td>
//                                 <td class="text-end"><span>${v.data_expiration} </span></td>
//                             </tr>`;

//             $(".historico_pedidos").append(historico_p);         
//         });


        


//       }else{
//         $(".card-pedidos1").html('');
//         $(".historico_pedidos").html('');
//         removeToken();
//         window.location.href = 'login.html';
//       }
//     })
// }

// session();

function session_status(){
    $.post(server()+"api/",{
      token: getToken(),
      route: 'auth',
      type:'session',
      route: 'auth'
    }, function(resp){

      if(resp[0].status != "error"){
        setToken(resp[0].token);
        setEmail(resp[0].email);
      }else{
        removeEmail();
        removeToken();


        const channel = new BroadcastChannel("logout_session");
        channel.postMessage({ type: "deslogado", pagina: "dashboard" });
        
        // window.postMessage({ type: 'logout-session', view: 'dashboard'}, '*');
        window.location.href = 'login.html';
      }
    })
}
setInterval(function(){
  session_status();
},2000);

