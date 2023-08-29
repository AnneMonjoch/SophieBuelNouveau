const gallery = document.querySelector('.gallery');
let works;
import { apiURL } from "./apiURL.js";

// Récupération des travaux depuis l'API
async function getTheWorks() {
  const getWorks = await fetch(`${apiURL}works`);
  works = await getWorks.json();

  //appel de la fonction createWorks pour afficher les travaux
  createWorks();
}

getTheWorks();

//Affichage des travaux sur la page d'accueil
function createWorks() {
  for (let i = 0; i < works.length; i++) {
    const newWork = document.createElement('figure');
    newWork.dataset.id = works[i].id;
    const newWorkImg = document.createElement('img');
    newWorkImg.src = works[i].imageUrl;
    const newWorkText = document.createElement('figcaption');
    newWorkText.innerHTML = works[i].title;
    //attribution d'un categoryId aux balises newWork pour pouvoir les filtrer
    newWork.setAttribute('categoryId', works[i].categoryId);

    // rattachement aux div parents pour afficher les éléments sur la page
    gallery.appendChild(newWork);
    newWork.appendChild(newWorkImg);
    newWork.appendChild(newWorkText);
  }
  
  //création d'une constante pour stocker les éléments créer à partir du tableau works
  const worksElements = document.querySelectorAll(".gallery figure"); 

  // Récupération des boutons de filtres
  const tousBtn = document.querySelector("#tous");
  const objetsBtn = document.querySelector("#objets");
  const appartementsBtn = document.querySelector("#appartements");
  const hotelsRestaurantsBtn = document.querySelector("#hotelsRestaurants");


// Fonction pour afficher ou masquer les boutons de filtre en fonction du statut de connexion
const userToken = localStorage.getItem('token');

// Fonction pour afficher ou masquer les boutons de filtre en fonction du statut de connexion
function toggleFilterButtons(isLoggedIn) {
  const displayValue = isLoggedIn ? 'none' : 'block';
  tousBtn.style.display = displayValue;
  objetsBtn.style.display = displayValue;
  appartementsBtn.style.display = displayValue;
  hotelsRestaurantsBtn.style.display = displayValue;
}

// Appel initial pour afficher ou masquer les boutons en fonction du statut de connexion actuel
function toggleFilterButtons(isLoggedIn) {
  const displayValue = isLoggedIn ? 'none' : 'block';
  tousBtn.style.display = displayValue;
  objetsBtn.style.display = displayValue;
  appartementsBtn.style.display = displayValue;
  hotelsRestaurantsBtn.style.display = displayValue;
}

// Appel initial pour afficher ou masquer les boutons en fonction du statut de connexion actuel
toggleFilterButtons(userToken !== null);

 // PARTIE MODIFIER
tousBtn.addEventListener("click", function() {
  filterWorksByCategory(null);
});

objetsBtn.addEventListener("click", function() {
  filterWorksByCategory(1);
});

appartementsBtn.addEventListener("click", function() {
  filterWorksByCategory(2);
});

hotelsRestaurantsBtn.addEventListener("click", function() {
  filterWorksByCategory(3);
});

// Fonction de filtrage par catégorie
function filterWorksByCategory(categoryId) {
  for (let i = 0; i < worksElements.length; i++) {
    if (categoryId === null || works[i].categoryId === categoryId) {
      worksElements[i].style.display = "block";
    } else {
      worksElements[i].style.display = "none";
    }
  }
}

}

// récupération du token dans le local Storage
const userToken = localStorage.getItem('token');

if (userToken) {
  // changement du login en logout
  const loginButton = document.querySelector("#loginButton");
  loginButton.innerHTML = "<a href='javascript:void(0)'>logout</a>";

  // décalage des éléments de navigation pour afficher la barre de modification
  const h1Header = document.querySelector("header h1");
  h1Header.style.marginTop = "38px";
  const nav = document.querySelector("nav");
  nav.style.marginTop ="38px"

  //affichage de la barre de modification
  const modeEditionBandeau = document.querySelector(".mode-edition");
  modeEditionBandeau.style.display = "flex";

  // écouteur d'évènement pour retirer le token du localStorage au logout
  loginButton.addEventListener('click', function() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });


  

  // ajout des boutons modifier et positionnement "Mes Projets"
  document.querySelector("#introduction i").style.display = "block";
  document.querySelector("#portfolio i").style.display = "block";
  document.querySelector(".portfolio-title").style.marginLeft = "115px";


  //MODALE

  const modal = document.getElementById("myModal");
  const modalContent = document.querySelector(".modalContent");
  const openModalButton = document.getElementById("openModalButton");
  const closeModalButton = document.querySelectorAll(".closeModalButton");
  const mediaListing = document.getElementById("mediaListing")
  const addPhoto = document.getElementById("addPhoto")
  const modalGallery = document.querySelector(".modalGallery");

  //écouteur d'évènement pour ouvrir la modale
  openModalButton.addEventListener('click', function() {
    openModal();
    modalContent.setAttribute("tabindex", 3);
  })
  
  // déclaration d'une varaible pour savoir si les images sont importées ou non dans la modale
  let imagesImported = false;

  // création de la gallery dans la modale 
  function createModalGallery () {
    for (let i = 0; i < works.length; i++) {
    const newWork = document.createElement('figure');
    newWork.setAttribute('data-id', works[i].id);
    const newWorkImg = document.createElement('img');
    newWorkImg.src = works[i].imageUrl;
    const newWorkText = document.createElement('figcaption');
    newWorkText.innerHTML = "editer";
    const newDustBin = document.createElement('div')
    newDustBin.classList = "dustbin"
    newDustBin.innerHTML = "<i class='fa-solid fa-trash-can'></i>"
    newWork.setAttribute("tabindex", 3)
    const modalGalleryBar = document.querySelector(".modalGalleryBar")
    modalGalleryBar.setAttribute("tabindex", 3)
    const boutonAjoutPhoto = document.getElementById("ajoutPhoto")
    boutonAjoutPhoto.setAttribute("tabindex", 3)
    const boutonSupprModal = document.getElementById("boutonSupprModal")
    boutonSupprModal.setAttribute("tabindex", 3)

    modalGallery.appendChild(newWork);
    newWork.appendChild(newWorkImg);
    newWork.appendChild(newWorkText);
    newWork.appendChild(newDustBin)
    
    imagesImported = true;

    
    // écouteur d'évènement sur les icones poubelles pour supprimer une image
    newDustBin.addEventListener('click', function() {
      const workId = newWork.getAttribute('data-id');
      deleteWork(workId, newWork);
    })
    }
  }

  // fonction pour afficher la modale
  const openModal = async function () {
    modal.style.display = "flex"
    if (!imagesImported) {
     
      createModalGallery()
      
      // écouteur d'évènement pour changer le contenu de la modale au clique sur le bouton ajout Photo (page 2 de la modale)
      document.getElementById("ajoutPhoto").addEventListener('click', function() {
        mediaListing.style.display = "none"
        addPhoto.style.display = "flex"
      })
    }
  }

  // fonction pour fermer la modale
  const closeModal = function () {
    modal.style.display = "none"
    mediaListing.style.display = "flex"
    addPhoto.style.display = "none"
  }
  
  //écouteur d'évènement pour fermer la modale au click sur la croix
  Array.from(closeModalButton).forEach(element => {
    element.addEventListener('click', function(e) {
        closeModal();
    })
  });

  // //écouteur d'évènement pour fermer la modale au clique en dehors de celle-ci
  modal.addEventListener('click', function(e) {
    if (e.target !== modal) {
      return
    } else if (e.target !== modalContent) {
      closeModal();
    }
  }) 

  // écouteur d'évènement pour fermer la modale si on appuie sur le bouton Echap
  window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
      closeModal(e)
    }
  })

  // fonction pour supprimer les travaux
  async function deleteWork(workId, worksElements) {
      const response = await fetch(`${apiURL}works/${workId}`, {
         headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json',
          'Accept': 'application/json'} ,
          method: 'DELETE'  
        } );
      if (response.ok) {
        worksElements.remove();
        document.querySelector(`figure[data-id="${workId}"]`).remove();
      } 
    }

  // écouteur d'évènement pour retourner sur la gallery dans la modale (page 1 de la modale)
  document.getElementById("returnToMediaListing").addEventListener("click", function () {
    mediaListing.style.display = "flex"
    addPhoto.style.display = "none"
    document.getElementById("postNewPhotoForm").reset();
    retirerPrevisualisation()
  })

  // fonction pour afficher la prévisualisation de l'image dans le formulaire
  function afficherImage() {
    let file = document.getElementById("plusAjoutPhoto").files
    let imgToShow = document.getElementById("imgToShow")
    const image = document.getElementById("plusAjoutPhoto")
    const iconeLandscape = document.getElementById("iconeLandscape")
    const legendAjoutPhoto = document.getElementById("legendAjoutPhoto")
    const tailleFichier = document.getElementById("tailleFichier")
    if (file.length >0 ) {
      let fileReader = new FileReader();
        fileReader.onload = function(event) {
          imgToShow.setAttribute("src", event.target.result)
          imgToShow.style.width = "129px"
          imgToShow.style.height = "169px"
          image.style.display = "none"
          iconeLandscape.style.display = "none"
          legendAjoutPhoto.style.display = "none"
          tailleFichier.style.display = "none"
        }
        fileReader.readAsDataURL(file[0])
    }
  }

  document.getElementById("plusAjoutPhoto").addEventListener('change', function() {
    afficherImage()
  })
  
  let image = document.getElementById("plusAjoutPhoto")
  let titre = document.getElementById("titreAjoutPhoto")
  let categorie = document.getElementById("categorieAjoutPhoto")
  const validAjoutPhoto = document.getElementById("validAjoutPhoto")
  
  // fonction qui passe le bouton Valider en vert si tous les champs sont remplis
  function checkFormInputs() {
    image = document.getElementById("plusAjoutPhoto")
    titre = document.getElementById("titreAjoutPhoto")
    categorie = document.getElementById("categorieAjoutPhoto")
      if (image.value.length > 0 && titre.value.length > 0 && categorie.value.length > 0) {
        validAjoutPhoto.style.backgroundColor = "#1D6154"
      } else {
        validAjoutPhoto.style.backgroundColor = "#A7A7A7"
      }
    } 

  // écouteur d'évènement pour checker les inputs de mon formulaire
  Array.from(document.querySelector(".inputForm")).forEach (function (element){
    element.addEventListener("change", function (){
      checkFormInputs()
    })
  })
  
  // fonction pour envoyer une nouvelle photo 
  async function sendNewPhoto() {
    const formData = new FormData(document.getElementById("postNewPhotoForm"));
    const newPhotoPosted = await fetch (`${apiURL}works`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: formData,
        method: 'POST'  
      } );
      const result = await newPhotoPosted.json();
        
    if (result) {
      // creation du nouveau travail et affichage dynamique

        // dans la Gallery
      const newWork = document.createElement('figure');
      newWork.dataset.id = result.id;
      const newWorkImg = document.createElement('img');
      newWorkImg.src = result.imageUrl;
      const newWorkText = document.createElement('figcaption');
      newWorkText.innerHTML = result.title;
      newWork.setAttribute('categoryId', result.categoryId);
    
      gallery.appendChild(newWork);
      newWork.appendChild(newWorkImg);
      newWork.appendChild(newWorkText);

        // dans la modale
      const newWorkModal = document.createElement('figure');
      newWorkModal.setAttribute('data-id', result.id);
      const newWorkImgModal = document.createElement('img');
      newWorkImgModal.src = result.imageUrl;
      const newWorkTextModal = document.createElement('figcaption');
      newWorkTextModal.innerHTML = "editer";
      const newDustBin = document.createElement('div')
      newDustBin.classList = "dustbin"
      newDustBin.innerHTML = "<i class='fa-solid fa-trash-can'></i>"
      newWorkModal.setAttribute("tabindex", 3)
        
      modalGallery.appendChild(newWorkModal);
      newWorkModal.appendChild(newWorkImgModal);
      newWorkModal.appendChild(newWorkTextModal);
      newWorkModal.appendChild(newDustBin)

      newDustBin.addEventListener('click', function() {
      const workId = newWork.getAttribute('data-id');
      deleteWork(workId, newWork);
      })
    }
  }
    
  // ecouteur d'évènement à l'envoie du formulaire
  document.getElementById("postNewPhotoForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // si les champs ne sont pas remplis, envoyer un message d'alerte 
    if (!image.value || !titre.value || !categorie.value) {

      alert("Veuillez remplir tous les champs requis")

    } else {

      // envoyer les données remplies dans le formulaire
      const image = document.getElementById("plusAjoutPhoto").value
      const titre = document.getElementById("titreAjoutPhoto").value
      const categorie = document.getElementById("categorieAjoutPhoto").value
        
      // appel de la fonction pour envoyer le nouveau travail
      sendNewPhoto(image, titre, categorie);
      retirerPrevisualisation()
      document.getElementById("postNewPhotoForm").reset();
    }
  })

  // fonction qui réinitialise la prévisualisation de l'image dans le formulaire
  function retirerPrevisualisation() {
    imgToShow.removeAttribute("src");
    imgToShow.style.width = "0";
    imgToShow.style.height = "0";
    image.style.display = "flex";
    iconeLandscape.style.display = "flex";
    legendAjoutPhoto.style.display = "flex";
    tailleFichier.style.display = "flex";
  }
}


  



