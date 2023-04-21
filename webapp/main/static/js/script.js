
var num = 1;
function add_layer() {
	if(num<=5){
		var x = document.createElement('div');
		x.id = 'layer'+num;
		x.name = 'layer'+num;
		x.setAttribute("class", "row");
		x.style = "margin-bottom: -22.41px;"
		x.innerHTML=`<br>
					<div class="col">
					<label id="ltypel`+num+`">Layer type</label>
					<select name="ltype`+num+`" id="ltype`+num+`" form="model_form" class="browser-default" onchange="detect_change(this);">
						<option value="Dense">Dense</option>
						<option value="LSTM">LSTM</option>
						<option value="GRU">GRU</option>
						<option value="SimpleRNN">SimpleRNN</option>
						<option value="Conv1D">Conv1D</option>
						<option value="Conv2D">Conv2D</option>
					</select>
					</div>
					<div class=" input-field col">
						<input type="number" value="60" min="1" max="999" id="lunits`+num+`" name="lunits`+num+`" form="model_form" style="text-align:center;" required>
						<label class="active" id="lunitsl`+num+`">Units</label>
					</div>
					<div class="col">
						<label id="lactivationl`+num+`">Activation</label>
						<select class="browser-default" id="lactivation`+num+`" name="lactivation`+num+`" form="model_form">
							<option value="relu">Relu</option>
							<option value="tanh">Tanh</option>
							<option value="sigmoid">Sigmoid</option>
							<option value="softmax">Softmax</option>
							<option value="exponential">Exponential</option>
							<option value="linear">Linear</option>
						</select>
					</div>
					<div class="col">
					<label id="lbiasl`+num+`">Bias</label>
						<select id="lbias`+num+`" name="lbias`+num+`" form="model_form" class="browser-default">
							<option value="zeros">Zeros</option>
							<option value="ones">Ones</option>
						</select>
					</div>
					<div class="input-field col" id="lddropout`+num+`">
						<input type="number" value="0.00" min="0.00" max="1" step=".01" id="ldropout`+num+`" name="ldropout`+num+`" form="model_form" style="text-align:center;"/>
						<label class="active" id="ldropoutl`+num+`">Dropout</label>
					</div>`;

		document.getElementById('content').appendChild(x);
		num++; 
	}
} 

function sub_layer() {
	var temp = num-1;
	if (temp>0){
		var elem = document.getElementById('layer'+temp);
		elem.parentNode.removeChild(elem);
		num--;
	}  
	if(document.getElementById('layer1')==null && document.getElementById('inputly')!=null){
		document.getElementById('inputly').remove();
	}
	if(document.getElementById('layer1')==null && document.getElementById('inputlz')!=null){
		document.getElementById('inputlz').remove();
		document.getElementById('tempspc').remove();
	}
	var dense_card = document.createElement('div');
	dense_card.id = 'Dense_card';
	dense_card.innerHTML=`<div class="card-content grey-text">
            		<span class="card-title">Dense</span>
            		<div class="card-image">
              			<img src="{% static 'images/Dense_Model.gif' %}" />
            		</div>
            		<div class="card-panel  white " style="height:470px;">
              			<span class="grey-text" >
						    Dense Neural Network have the same formulas as the linear layers wx+b, but
						    the end result is passed through a non-linear function called Activation
						    function. Each non linear activation function can be decomposed to Taylor
						    series thus producing a polynomial of a degree higher than 1. By stacking
						    several dense non-linear layers (one after the other) we can create higher
						    and higher order of polynomials. For instance, let’s imagine we use the
						    following non-linear activation function: (y=x²+x). By stacking 2 instances
						    of it, we can generate a polynomial of degree 4, having (x⁴, x³, x², x)
						    terms in it. Thus the more layers we add, the more complex mathematical
						    functions we can model.
              			</span>
            		</div>
          		</div>`;
	if(document.getElementById('layer1')==null){
	 	if(document.getElementById('Conv_card')!=null){
	 		document.getElementById('Conv_card').remove();
	 	}
	 	if(document.getElementById('GRU_card')!=null){
	 		document.getElementById('GRU_card').remove();
	 	}
	 	if(document.getElementById('LSTM_card')!=null){
	 		document.getElementById('LSTM_card').remove();
	 	}
	 	if(document.getElementById('RNN_card')!=null){
	 		document.getElementById('RNN_card').remove();
	 	}
	 	if(document.getElementById('Dense_card')==null){
	 		document.getElementById('var_content').appendChild(dense_card);
	 	}
	 }
} 
function detect_change(input){
	var id = input.id;
	var n = id.slice(-1);
	var idx = input.selectedIndex;
	var tempind = document.getElementById('ltype1').selectedIndex;
	if(document.getElementById('layer1')!=null){
		if(tempind!='0' && document.getElementById('inputly')==null){
			var inz = document.createElement(`div`);
			inz.setAttribute("class", "input-field col");
			inz.id = "dinputly";
			inz.innerHTML = `<input type="number" max="99999" min="1" name="inputly" id="inputly" style="text-align:center;" required>`;
			document.getElementById('inputl').appendChild(inz);
		}
		if(tempind=='5' && document.getElementById('inputlz')==null){
			var inf = document.createElement(`div`);
			inf.setAttribute("class", "input-field col");
			inf.id = "dinputlz";
			inf.innerHTML = `<input type="number" max="99999" min="1" name="inputlz" id="inputlz" style="text-align:center;" required>`;
			document.getElementById('inputl').appendChild(inf);
		}
	}
	if((document.getElementById('dinputly')!=null && tempind=='0') || document.getElementById('layer1')==null){
		document.getElementById('dinputly').remove();
	}
	if((document.getElementById('dinputlz')!=null && tempind!='5') || document.getElementById('layer1')==null){
		document.getElementById('dinputlz').remove();
	}
	if (idx == '1' || idx == '2' || idx == '3'){
		document.getElementById('lactivation'+n).selectedIndex = "1";	
	}
	else
	{
		document.getElementById('lactivation'+n).selectedIndex = "0";	
	}	
	if(idx == '4' && document.getElementById('lkernal'+n)==null){
		var l = document.createElement(`div`);
		l.id = 'dlkernal'+n;
		l.setAttribute("class", "input-field col");
		l.innerHTML = `<input value="3" type="number" max="9" min="1" name="lkernal`+n+`" id="lkernal`+n+`" style="text-align:center;" required>
					   <label class="active">Kernal</label>`;

		var e = document.createElement(`div`);
		e.setAttribute("class", "col");
		e.id = 'dlflatten'+n;
		e.innerHTML = ` <label>Flatten</label>
						<select class="browser-default" name="lflatten`+n+`" id="lflatten`+n+`">
						<option value='False'>False</option>
					   	<option value='True'>True</option>
					   	</select>`;

		document.getElementById('layer'+n).appendChild(l);
		document.getElementById('layer'+n).appendChild(e);
	}
	else if(idx == '5' && document.getElementById('lkernalx'+n)==null){
		var yx = document.createElement(`div`);
		yx.id = 'dlkernalx'+n;
		yx.setAttribute("class", "input-field col");
		yx.innerHTML = `<input value="3" type="number" max="10" min="1" name="lkernalx`+n+`" id="lkernalx`+n+`" style="text-align:center;" required>
					    <label class="active">Kernal</label>`;

		var yy = document.createElement(`div`);
		yy.id = 'dlkernaly'+n;
		yy.setAttribute("class", "input-field col");
		yy.innerHTML = `<input type="number" value="3" max="10" min="1" name="lkernaly`+n+`" id="lkernaly`+n+`" style="text-align:center;" required>`;

		var f = document.createElement(`div`);
		f.setAttribute("class", "col");
		f.id = 'dlflatten'+n;
		f.innerHTML = ` <label>Flatten</label>
						<select class="browser-default" name="lflatten`+n+`" id="lflatten`+n+`">
						<option value='False'>False</option>
					   	<option value='True'>True</option>
					   	</select>`;

		document.getElementById('layer'+n).appendChild(yx);
		document.getElementById('layer'+n).appendChild(yy);
		document.getElementById('layer'+n).appendChild(f);
	 }
	if(idx != '4' && document.getElementById('dlkernal'+n)!=null){
	 	document.getElementById('dlkernal'+n).remove();
	 	document.getElementById('dlflatten'+n).remove();
	 }
	if(idx !='5' && document.getElementById('dlkernalx'+n)!=null){
	 	document.getElementById('dlkernalx'+n).remove();
	 	document.getElementById('dlkernaly'+n).remove();
	 	document.getElementById('dlflatten'+n).remove();
	}
	 if((idx == '1' || idx =='2' || idx =='3') && document.getElementById('lreturnsequence'+n)==null){
	 	var a = document.createElement(`div`);
	 	a.setAttribute("class", "col");
		a.id = 'dlreturnsequence'+n;
		a.innerHTML = ` <label>Return</label>
						<select class="browser-default" name="lreturnsequence`+n+`" id="lreturnsequence`+n+`">
						<option value='True'>True</option>
						<option value='False'>False</option>
					   	</select>`;

		document.getElementById('layer'+n).appendChild(a);
	 }
	 else if((idx != '1' && idx !='2' && idx !='3') && document.getElementById('lreturnsequence'+n)!=null){
	 	document.getElementById('dlreturnsequence'+n).remove();
	 }
	 var dense_cardl = document.createElement('div');
	dense_cardl.id = 'Dense_card';
	dense_cardl.innerHTML=`<div class="card-content grey-text">
            		<span class="card-title">Dense</span>
            		<div class="card-image">
              			<img src="{% static 'images/Dense_Model.gif' %}" />
            		</div>
            		<div class="card-panel  white " style="height:470px;">
              			<span class="grey-text" >
						    Dense Neural Network have the same formulas as the linear layers wx+b, but
						    the end result is passed through a non-linear function called Activation
						    function. Each non linear activation function can be decomposed to Taylor
						    series thus producing a polynomial of a degree higher than 1. By stacking
						    several dense non-linear layers (one after the other) we can create higher
						    and higher order of polynomials. For instance, let’s imagine we use the
						    following non-linear activation function: (y=x²+x). By stacking 2 instances
						    of it, we can generate a polynomial of degree 4, having (x⁴, x³, x², x)
						    terms in it. Thus the more layers we add, the more complex mathematical
						    functions we can model.
              			</span>
            		</div>
          		</div>`;


    var conv_card = document.createElement('div');
	conv_card.id = 'Conv_card';
	conv_card.innerHTML=`<div class="card-content grey-text">
            		<span class="card-title">Convolution</span>
            		<div class="card-image">
              			<img src="{% static 'images/CNN_Model.gif' %}" />
            		</div>
            		<div class="card-panel  white " style="height:410px;">
              			<span class="grey-text" >
						    The purpose of doing convolution is to extract useful features from the
						    input. In image processing, there is a wide range of different filters one
						    could choose for convolution. Each type of filters helps to extract
						    different aspects or features from the input image, e.g. horizontal /
						    vertical / diagonal edges. Similarly, in Convolutional Neural Network,
						    different features are extracted through convolution using filters whose
						    weights are automatically learned during training. All these extracted
						    features then are ‘combined’ to make decisions.
              			</span>
            		</div>
          		</div>`;

    var lstm_card = document.createElement('div');
	lstm_card.id = 'LSTM_card';
	lstm_card.innerHTML=`<div class="card-content grey-text">
            		<span class="card-title">LSTM</span>
            		<div class="card-image">
              			<img src="{% static 'images/lstmmodel.gif' %}" />
            		</div>
            		<div class="card-panel  white " style="height:415px;">
              			<span class="grey-text" >
						    LSTM Neural Networks, which stand for Long Short-Term Memory, are a
						    particular type of recurrent neural networks that got lot of attention
						    recently within the machine learning community. In a simple way, LSTM
						    networks have some internal contextual state cells that act as long-term or
						    short-term memory cells. The output of the LSTM network is modulated by the
						    state of these cells. This is a very important property when we need the
						    prediction of the neural network to depend on the historical context of
						    inputs, rather than only on the very last input.
              			</span>
            		</div>
          		</div>`;
    var gru_card = document.createElement('div');
	gru_card.id = 'GRU_card';
	gru_card.innerHTML=`<div class="card-content grey-text">
            		<span class="card-title">GRU</span>
            		<div class="card-image">
              			<img src="{% static 'images/GRU_Model.jpeg' %}" />
            		</div>
            		<div class="card-panel  white " style="height:330px;">
              			<span class="grey-text" >
						    GRU aims to solve the vanishing gradient problem
						    of standard RNN. GRU can also be
						    considered as a variation on the LSTM because both are designed similarly
						    and, in some cases, produce equally excellent results. GRUs are improved
						    version of standard RNN. What makes them so special
						    is that they solve the problem of vanishing gradient of a standard
						    RNN.To solve the vanishing gradient problem of a standard RNN, GRU uses,
						    so-called, update gate and reset gate.
              			</span>
            		</div>
          		</div>`;
         var rnn_card = document.createElement('div');
	rnn_card.id = 'RNN_card';
	rnn_card.innerHTML=`<div class="card-content grey-text">
            		<span class="card-title">SimpleRNN</span>
            		<div class="card-image">
              			<img src="{% static 'images/RNN_Model.gif' %}" />
            		</div>
            		<div class="card-panel  white " style="height:410px;">
              			<span class="grey-text" >
						    A RNN is a class of artificial neural networks
						    where connections between nodes form a directed graph along a temporal
						    sequence. This allows it to exhibit temporal dynamic behavior. Derived from
						    feedforward neural networks, RNNs can use their internal state (memory) to
						    process variable length sequences of inputs. This makes them applicable
						    to tasks such as unsegmented, connected handwriting recognition or speech
						    recognition. The term “rnn” is used
						    indiscriminately to refer to two broad classes of networks with a similar
						    general structure, where one is finite impulse and the other is infinite
						    impulse.
              			</span>
            		</div>
          		</div>`;
	 if(document.getElementById('layer1')!=null){
	 	if(tempind==0 && document.getElementById('Dense_card')==null){
	 		if(document.getElementById('GRU_card')!=null){
	 		document.getElementById('GRU_card').remove();
		 	}
		 	if(document.getElementById('LSTM_card')!=null){
		 		document.getElementById('LSTM_card').remove();
		 	}
		 	if(document.getElementById('RNN_card')!=null){
		 		document.getElementById('RNN_card').remove();
		 	}
		 	if(document.getElementById('Conv_card')!=null){
		 		document.getElementById('Conv_card').remove();
		 	}
		 	document.getElementById('var_content').appendChild(dense_cardl);
	 	}
	 	if(tempind==1 && document.getElementById('LSTM_card')==null){
	 		if(document.getElementById('GRU_card')!=null){
	 		document.getElementById('GRU_card').remove();
		 	}
		 	if(document.getElementById('Dense_card')!=null){
		 		document.getElementById('Dense_card').remove();
		 	}
		 	if(document.getElementById('RNN_card')!=null){
		 		document.getElementById('RNN_card').remove();
		 	}
		 	if(document.getElementById('Conv_card')!=null){
		 		document.getElementById('Conv_card').remove();
		 	}
		 	document.getElementById('var_content').appendChild(lstm_card);
	 	}
	 	if(tempind==2 && document.getElementById('GRU_card')==null){
	 		if(document.getElementById('Dense_card')!=null){
	 		document.getElementById('Dense_card').remove();
		 	}
		 	if(document.getElementById('LSTM_card')!=null){
		 		document.getElementById('LSTM_card').remove();
		 	}
		 	if(document.getElementById('RNN_card')!=null){
		 		document.getElementById('RNN_card').remove();
		 	}
		 	if(document.getElementById('Conv_card')!=null){
		 		document.getElementById('Conv_card').remove();
		 	}
		 	document.getElementById('var_content').appendChild(gru_card);
	 	}
	 	if(tempind==3 && document.getElementById('RNN_card')==null){
	 		if(document.getElementById('GRU_card')!=null){
	 		document.getElementById('GRU_card').remove();
		 	}
		 	if(document.getElementById('LSTM_card')!=null){
		 		document.getElementById('LSTM_card').remove();
		 	}
		 	if(document.getElementById('Dense_card')!=null){
		 		document.getElementById('Dense_card').remove();
		 	}
		 	if(document.getElementById('Conv_card')!=null){
		 		document.getElementById('Conv_card').remove();
		 	}
		 	document.getElementById('var_content').appendChild(rnn_card);
	 	}
	 	if(tempind==4 && document.getElementById('Dense_card')==null){
	 		if(document.getElementById('GRU_card')!=null){
	 		document.getElementById('GRU_card').remove();
		 	}
		 	if(document.getElementById('LSTM_card')!=null){
		 		document.getElementById('LSTM_card').remove();
		 	}
		 	if(document.getElementById('RNN_card')!=null){
		 		document.getElementById('RNN_card').remove();
		 	}
		 	if(document.getElementById('Conv_card')!=null){
		 		document.getElementById('Conv_card').remove();
		 	}
		 	document.getElementById('var_content').appendChild(dense_cardl);
	 	}
	 }
}
function detectopt(inputo){
	var el = document.getElementById('modellr');
 	var idxo = inputo.selectedIndex;
 	if(idxo == '1' && document.getElementById('momentum')==null){
 		var j = document.createElement(`div`);
		j.id = 'dmomentum';
		j.setAttribute("class", "input-field col");
		j.innerHTML = `<input type="number" step=".1" value="0.0" max="1.0" min="0.0" name="momentum" id="momentum" style="text-align:center;" required>
					   <label class="active">Momentum</label>`;
 		document.getElementById('modelspecs').appendChild(j);
 	}
 	else if(idxo != 1 && document.getElementById('momentum')!=null){
 		document.getElementById('dmomentum').remove();
 	}
 	if(idxo=='0' || idxo=='2'){
 		el.value = '0.001';
 	}
 	else if(idxo=='1'||idxo=='5'){
 		el.value = '0.01';
 	}
 	else if(idxo=='6'||idxo=='4'){
 		el.value = '0.002';
 	}
 	else if(idxo=='3'){
 		el.value = '1.0';
 	}
 }

 