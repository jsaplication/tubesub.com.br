try{
	window.electronAPI.onDataFromView2((data) => {
        console.log('Dados recebidos na view menu:', data);
        
        var uid = data.data.uid;
        var foto = data.data.foto;
        var status = data.data.status;
        var statuNoty = data.data.status_noty;
        var status_connect = data.data.status_connect;
       
        if(status == true){
        	$("#navegador"+uid+' .count-msg').show();
        }else {
        	$("#navegador"+uid+' .count-msg').hide();
        }


        if(statuNoty == false){
        	$("#navegador"+uid+' .count-msg-noty').show();
        }else {
        	$("#navegador"+uid+' .count-msg-noty').hide();
        }



        if(status_connect = true ){
        	$("#navegador"+uid+' .zap-status').text('Conectado');
        	$("#navegador"+uid+' .zap-status').attr('style', "color:#00A884;");
        }else{
        	$("#navegador"+uid+' .zap-status').show('Desconectado');
        	$("#navegador"+uid+' .zap-status').attr('style', "");
        }
		$("#conta"+uid).attr(`style`, `background-image: url('${foto}')`);
});

}catch(e){
	console.log(e);
}


function openTela(e){
	var uid = e.getAttribute('uid');
	console.log("uid",uid);
	$("div .btn-menu").removeClass('btn_active');
	$(e).addClass('btn_active');

	window.localStorage.setItem('view', uid);
	window.postMessage({ type: 'open-contas', view: uid}, '*');
}

function getItemCache(){
	var cache = window.localStorage.getItem('historico_contas');
	var list = JSON.parse(cache);
	mylist = [];
	if(list == null || list == undefined || list == ''){
		mylist = mylist;
	}else{
		mylist = list;
	}

	var item = {
	    uid: 'dashboard',
	    name: 'Dashboard',
	    capa: 'dashboard.png'
	};

	var exists = mylist.some(function(element) {
	    return element.uid === item.uid;
	});


	if (!exists) {
	    mylist.unshift(item);
	}
	return mylist;
}

function newzap(e){
	
	
		var limite = 50;
		var hist = getItemCache();
		var total = hist.length;
		var type =  e.getAttribute('type');
		
		var newlimite = hist.slice(0, limite+1);
		
		if((newlimite.length - 1) >= Number(limite)){
			alert('Você atingiu o limite máximo de contas do YouTube configuradas na aplicação.')
			getCounts(Number(newlimite.length + 1));
		}else{
			var url;
			if(type === 'whatsapp'){
				url = "https://web.whatsapp.com";
			}else{
				url = '';
			}
			var item = {
					uid: gerarUID(),
					name: `Nova Conta`,
					capa: '',
					type: type,
					url: url
				}

			newlimite.push(item);
			window.localStorage.setItem('historico_contas', JSON.stringify(newlimite));

			update_session_zap(newlimite);

			getCounts(Number(newlimite.length));
		}
}


function deleteSession(e){
	var uid = e.getAttribute('uid');
	console.log('uid->',uid);

	var list = getItemCache();
	// const contas = list.filter(produto => produto.uid !== Number(uid));
	const contas = list.filter(produto => produto.uid !== uid);
	console.log('result',contas)
	window.localStorage.setItem('historico_contas', JSON.stringify(contas));

	var limite = 50;

	getCounts(Number(limite));

	window.postMessage({ type: 'remove-session', view: uid}, '*');

	update_session_zap(contas);
}


function getCounts(limite){
	var hist = getItemCache();
	console.log(hist)
	var newlimite = hist.slice(0, limite+1);
	document.querySelector('.zap-box-button').innerHTML = '';
	$("totalcount").text(newlimite.length - 1);

	

	for(var[k,v] of Object.entries(newlimite)){
		
		
		var options;
		var capa;
		var styleIcon;
		var typeClass;
		var iconetype;

		var status_cc;
		var btn_indent;
		if(v.uid === 'dashboard'){
			options = '';

			capa = './icones/dashboard.png';
			styleIcon = 'background-size: 60%; background-repeat: no-repeat; background-position: center center;';
			typeClass = '';
			status_cc = '<div class="zap-statusf"></div>';

			btn_indent = '';
		}else{
			btn_indent = 'btn_indent';
			status_cc = `<div class="zap-status">Desconectado</div>`;
			styleIcon = '';
			typeClass = 'type-account';

			if(v.capa === '' || v.capa === undefined || v.capa === null){
					capa = './icones/perfil.png';
			}else{
					capa = 'data:image/png;base64,'+v.capa;
			}

			options  = `<div class="btn-remove" uid="${v.uid}" onclick="select(event)"></div>
				        	<div class="select select_${v.uid}">
				        		<div class="option" onclick="deleteSession(this)" uid="${v.uid}">
					        		<div class="icon-option">
										<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
										  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
										</svg>

					        		</div>

					        		Excluir Sessão
				        		</div>
				        		<div class="option" onclick="edit(event)" uid="${v.uid}">
					        		<div class="icon-option">
											<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
											  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
											</svg>
					        		</div>

					        		Renomar Sessão
				        		</div>
				        		<!--<div class="option" onclick="editCapa(this)" uid="${v.uid}"><div class="icon-option" style="background-image: url(icones/capa.png);"></div>Alterar Foto da Sessão</div>-->
				        	</div>`;
		

			if(v.type === 'youtube'){
				iconetype = './icones/youtube.webp';
			}else{
				iconetype = '';
			}

		}


		var html = `<button class="btn-menu ${btn_indent}" onclick="openTela(this)" uid="${v.uid}" id="navegador${v.uid}">
							<div class="${typeClass}" style="background-image: url(${iconetype})"></div>

							${options}


				        	<div class="icon" style="background-image: url('${capa}'); ${styleIcon}" id="conta${v.uid}"></div>
				        	<div class="count-msg animate__animated animate__bounce" title="Reproduzindo">
				        	<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
								  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
								</svg>
							</div>

							<div class="count-msg-noty animate__animated animate__bounce" title="Novas Notifícações">
				        	+1
							</div>



				        	<div class="zap-name newname_${v.uid}" onkeyup="newName(this, event)" contenteditable="false" uid="${v.uid}">${v.name}</div>
				        	${status_cc}
				        	
				        	

				        </button>`;
		var status_expiration  = window.localStorage.getItem('status_expired');

		
		document.querySelector('.zap-box-button').innerHTML += html;

		if(status_expiration === 'expired'){

          $(".btn_indent").hide();

        }else{
           $(".btn_indent").show();

        }



	}
	window.postMessage( {type:'list-session', list: newlimite}, '*');

	if(active == '' || active == null || active == undefined){
	console.log('view1')
	$("div .btn-menu").removeClass('btn_active');
	$("#navegador1").addClass('btn_active');
}else{

	
	console.log("view1_else", active)
	
	$("div .btn-menu").removeClass('btn_active');
	$("#navegador"+active).addClass('btn_active');

	var time = setInterval(function(){
		//window.postMessage({ type: 'open-contas', view: active}, '*');
		console.log('solicitou')
		clearInterval(time) 
	},4000)
	
}



}


function hideSelect() {
    $('div .select').hide();
}

function select(e) {
    e.stopPropagation();
    var uid = e.target.getAttribute('uid');
    $('div .select').hide();
    $('.select_'+uid).show();
}

function edit(e){
	e.stopPropagation();
	var uid = e.target.getAttribute('uid');
	console.log(uid)

	$("div .newName_active").attr('contenteditable', 'false');
	$("div .newName_active").focus();
	$("div .newName_active").attr('style', 'width: 200px; box-shadow: none; padding-left: 0px; padding-right: 0px; border-radius: 0px; background: none !important;');
	$("div .newName_active").removeClass('newName_active');


	$(".newname_"+uid).attr('contenteditable', 'true');
	$(".newname_"+uid).addClass('newName_active');
	$(".newname_"+uid).focus();
	$(".newname_"+uid).attr('style', 'width: 200px; box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px; padding-left: 5px; padding-right: 5px; border-radius: 10px; background: #0d736d;');
	$('div .select').hide();
}

function renameSession(data, uid, newName) {
    const item = data.find(item => item.uid === uid);
  
    if (item) {
        item.name = newName;
    } else {
        console.log(`Item com uid ${uid} não encontrado.`);
    }
    return data;
}

function newName(e, event){
	// e.stopPropagation();
		var name = $(e).text();
		var uid = $(e).attr('uid');
		console.log(name);

		if(event.keyCode  === 13){
			$(".newName_active").attr('contenteditable', 'false');
			$(".newName_active").focus();
			$(".newName_active").attr('style', 'width: 200px; box-shadow: none; padding-left: 0px; padding-right: 0px; border-radius: 0px; background: none !important;');
			$(".newName_active").removeClass('newName_active');

			var hist = getItemCache();
			var resp = renameSession(hist, uid, name);
			window.localStorage.setItem('historico_contas', JSON.stringify(resp));
			
		    getCounts(50);
	    	update_session_zap(resp)
		}
}

function editCapa(e){
	$(".uploadcapa").click();
	var uid = e.getAttribute('uid');
	window.localStorage.setItem('uid_active', uid)
}

$(".uploadcapa").change(function(){
		atualizarEventoIMG(this);
		console.log(this.files[0]);
});

var active = window.localStorage.getItem('view');
console.log('active ',active)




function update_session_zap(contas){
	window.localStorage.setItem('historico_contas', JSON.stringify(contas))
}

function sair(){
	window.localStorage.removeItem("token");
	setLimite(0)
	getCounts(Number(getLimite()));
	session();
}

// getCounts(Number(getLimite()));

setTimeout(function(){
	getCounts(50);
},1000);

// var statusSession_d = setInterval(function(){
// 	if(getToken() === null || getToken() === undefined){
// 		console.log('não existe session');
// 		removeToken();
// 		session();
// 		getCounts(0);
// 		clearInterval(statusSession_d);
// 	}else{

// 	}
// },1000);

var channel = new BroadcastChannel("logout_session");
channel.onmessage = (event) => {
  console.log("Mensagem de outra aba:", event.data);

  if(event.data.type === 'deslogado'){
  	    removeToken();
  		removeEmail();
		session();
		console.log(event.data.type, event.data.pagina);
  }

};

function closeAllview(){
	setTimeout(function(){
		window.postMessage({ type: 'close-contas'}, '*');
		console.log('closeContas disparado')
	},2000);
}

// setTimeout(function(){
// 	closeAllview();
// },2000);


