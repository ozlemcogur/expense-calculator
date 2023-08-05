const harcamaInput = document.querySelector('#harcama');
const fiyatInput = document.querySelector('#fiyat');
const statusCheck = document.querySelector('#status-input');
const formBtn = document.querySelector('.ekle-btn');
const liste = document.querySelector('.liste');
const toplamBilgi = document.querySelector('#toplam-bilgi');
const selectFilter = document.querySelector('#filter-select');

//izleme işlemleri
formBtn.addEventListener('click', addExpense);
liste.addEventListener('click', handleClick);

selectFilter.addEventListener('change', handleFilter);

//toplam state i 

let toplam = 0;
function updateToplam(fiyat) {

  toplam += Number(fiyat);

  toplamBilgi.innerText = toplam;


}

//harcama oluşturma

function addExpense(e) {
  e.preventDefault();

  //doğrulama yapma

  if (!fiyatInput.value || harcamaInput.value === '') {
    alert('Formlari Doldurun');
    return;

  }
  //div oluşturma

  const harcamaDiv = document.createElement("div");
  harcamaDiv.classList.add("products")
  if (statusCheck.checked) {
    harcamaDiv.classList.add("payed");

  };


  harcamaDiv.innerHTML = `    <h2>${harcamaInput.value}</h2>
  <h2 id="value">${fiyatInput.value}</h2>
  <div class="buttons">
      <img id= "payment" src="images/pay.png" alt="" >
      <img id= "remove" src="images/remove.png" alt="">
      </div>
  `;
  //htmle gönderme
  liste.appendChild(harcamaDiv);

  //toplamı güncelleme

  updateToplam(fiyatInput.value);

  //formu temizleme

  harcamaInput.value = "";
  fiyatInput.value = "";

}
//listeye tıklanma olayını yönetme

function handleClick(e) {
  const element = e.target;
  if (element.id === 'remove') {
    const wrapperElement = element.parentElement.parentElement;

    const deletedPrice = wrapperElement.querySelector('#value').innerText;

    updateToplam(-Number(deletedPrice));

    wrapperElement.remove();



  }

}
//filtreleme

function handleFilter(e) {
  const items = liste.childNodes;
  console.log(items);

  items.forEach((item) => {
    switch (e.target.value) {
      case 'all':
        item.style.display = 'flex';
        break;

      case 'payed':
        if (!item.classList.contains('payed')) {

          item.style.display = 'none';

        } else {
          item.style.display = 'flex';
        }
        break;

      case 'not-payed':
        if (item.classList.contains('payed')) {
          item.style.display = 'none';

        } else {
          item.style.display = 'flex';
        }

        break;
    }

  })
}

