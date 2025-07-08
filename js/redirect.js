//   function session(){
//     $.post(server()+"api/",{
//       token: getToken(),
//       route: 'auth',
//       type:'session',
//       route: 'auth'
//     }, function(resp){
//       console.log('session', resp);

//       if(resp[0].status != "error"){
        

//         setToken(resp[0].token);
//         setEmail(resp[0].email);

//         if(getPaginaCahe() === 'planos.html'){

//           removePaginaCahe();
//           window.location.href = 'planos.html';


//         }else{

//           removePaginaCahe();
//           window.location.href = 'dashboard.html';
//           window.postMessage({ type: 'restart-session', view: 'dashboard'}, '*');
//         }


//         // window.location.href = 'dashboard.html';
//         // window.postMessage({ type: 'restart-session', view: 'dashboard'}, '*');


//       }else{
//         // removeToken();
//         window.location.href = 'login.html';
//       }
//     })
// }
// session();
// setInterval(function(){
//   session();
// },1000);