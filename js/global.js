function gerarUID() {
  const timestamp = Date.now();
  const microseconds = Math.floor(performance.now() % 1000);
  const formattedTimestamp = `${timestamp}${microseconds}`;
  return formattedTimestamp;
}

function renameCapa(data, uid, newName) {
    const item = data.find(item => item.uid === uid);
    if (item) {
        item.capa = newName;
    } else {
        
    }
    return data;
}

function atualizarEventoIMG(input, uids) {
		console.log('upload-change')
	  
	    if (input.files && input.files[0]) {
	        var arquivo = input.files[0];
	        var resolucao = 50;
	        redimensionarImagemPorcentagem(arquivo, resolucao, function(novoArquivo){
	         
	         	 const reader = new FileReader();
                reader.onloadend = function() {
                    const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                    console.log('Base64 String:', base64String);
                    // Você pode usar a string Base64 aqui como necessário
                    var uid = window.localStorage.getItem('uid_active')
                    console.log('ddddddddddddddddddddd', uid)
                    var hist = getItemCache();
										var resp = renameCapa(hist, uid, base64String);
										window.localStorage.setItem('historico_zap', JSON.stringify(resp));
								    getCounts();

                }
            reader.readAsDataURL(novoArquivo);


	        })

	    }
}


function redimensionarImagemPorcentagem(arquivo, larguraDesejada, callback) {
    var reader = new FileReader();

    reader.onload = function (e) {
        var img = new Image();
        img.src = e.target.result;

        img.onload = function () {
            var novaLargura = larguraDesejada;
            var novaAltura = (img.height / img.width) * novaLargura;

            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = novaLargura;
            canvas.height = novaAltura;
            ctx.drawImage(img, 0, 0, novaLargura, novaAltura);
            canvas.toBlob(function (blob) {
                var novoArquivo = new File([blob], arquivo.name, { type: arquivo.type });
                callback(novoArquivo);
            }, arquivo.type);
        };
    };

    reader.readAsDataURL(arquivo);
}

function getPaginaCahe(){
    return window.localStorage.getItem('pagina_url');
}
function removePaginaCahe(){
     window.localStorage.removeItem('pagina_url');
}