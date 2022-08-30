console.log("conetado")




var select=document.querySelector("#monedas")
const input=document.querySelector("#input")
var h2=document.querySelector(".h2")
var valor_divisa=document.querySelector(".valor_divisa")
var now = moment().format("YYYY-MM-DD");
 var fecha_actual=document.querySelector(".fecha")
 fecha_actual.append(now)
var chart;
const url="https://mindicador.cl/api/"

// valor select
function validarselect() {
  const valor_inpunt= Number(input.value)
  console.log(valor_inpunt);
var valor_select= select.options[select.selectedIndex].value;
if (valor_select!="" & valor_inpunt>0) {
    obetenido_monedas(valor_select);
}
else{
    alert("debes insertar numero mayor a 0 y selecionar una moneda")
}

}



// funciones para realizar la operaciones matematicas //
async function obetenido_monedas(valor_select) {

try {
    
    const res = await
fetch("https://mindicador.cl/api/");
const monedas = await res.json();


var array=Object.values(monedas);
const  grafica=document.querySelector(".grafica")

     array.map((contenido) => {
    console.log(array)
     const valor_inpunt= parseFloat(input.value)
if (contenido.codigo=="dolar" &valor_select=="dolar" &valor_inpunt>0) {
  const operacion_matematica=(valor_inpunt/contenido.valor).toFixed(2);

  h2.innerHTML= "total divisa:"+operacion_matematica;
  valor_divisa.innerHTML="valor:"+contenido.valor

   renderGrafica(valor_select)
   
  
}

else if (contenido.codigo=="euro" & valor_select=="euro" &valor_inpunt>0) {
  const operacion_matematica=(valor_inpunt/contenido.valor).toFixed(2);
 
   h2.innerHTML="total divisa:"+operacion_matematica;
   valor_divisa.innerHTML="valor:"+contenido.valor

  renderGrafica(valor_select)
}
else if (contenido.codigo=="uf" & valor_select=="uf" &valor_inpunt>0) {
  const operacion_matematica=(valor_inpunt/contenido.valor).toFixed(2);

   h2.innerHTML="total:"+operacion_matematica;
   valor_divisa.innerHTML="valor:"+contenido.valor
 
  renderGrafica(valor_select)
}
else if (contenido.codigo=="utm" & valor_select=="utm" &valor_inpunt>0) {
  const operacion_matematica=(valor_inpunt/contenido.valor).toFixed(2);

   h2.innerHTML="total:"+operacion_matematica;
   valor_divisa.innerHTML="valor:"+contenido.valor
 
  renderGrafica(valor_select)
}
else if (contenido.codigo=="bitcoin" & valor_select=="bitcoin" &valor_inpunt>0) {
  const operacion_matematica=(valor_inpunt/contenido.valor).toFixed(2);

   h2.innerHTML="total:"+operacion_matematica;
   valor_divisa.innerHTML="valor:"+contenido.valor
 
  renderGrafica(valor_select)
}
})

} catch (e) {
alert("servidor no encontrado");
}
}

// funciones rendergrafica y grafica

  
    
  async function getAndCreateDataToChart(valor_select) {
    try {
        console.log(valor_select)
        const res = await
         fetch(`${url}${valor_select}`);
        const obejos_json = await res.json();
        console.log(obejos_json)
        var array_moneda=(obejos_json.serie);
       
        array_moneda= array_moneda.slice(0,10);
    
     
    const labels = array_moneda.map((fecha_moneda) => {
    console.log(fecha_moneda.fecha)
      
    var fecha = new Date(fecha_moneda.fecha)
    return(fecha.toLocaleDateString());   // profe aqui si yo le coloco fecha.toLocaleDateString() si me salen las fechas con otro formato
                          // pero cuando cambio el formato de fecha a la del desafio me muestra desde ayer .dejo ambos codigos
      
      
          });
    
          const data = array_moneda.map((moneda_valor) => {
             
        
     return Number(moneda_valor.valor)
    });
    const datasets = [
    {
    label:valor_select,
    borderColor: "rgb(255, 99, 132)",
    data
    }
    ];
    
    return { labels, datasets };
        } catch (e) {
           
        alert("servidor no encontrado");
        }
}

async function renderGrafica(valor_select) {
  if (chart) chart.destroy();
const data = await getAndCreateDataToChart(valor_select);
const config = {
type: "line",
data
};
const myChart = document.getElementById("myChart");
myChart.style.backgroundColor = "white";
chart = new Chart(myChart, config);
}