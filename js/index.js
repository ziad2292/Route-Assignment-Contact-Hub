let contactsList = [];
SaveToLocalStorage();

let search = document.getElementById("search");

let photoTag = document.getElementById("imageInput");
let nameTag = document.getElementById("name");
let numberTag = document.getElementById("number");
let emailTag = document.getElementById("email");
let addressTag = document.getElementById("address");
let groupTag = document.getElementById("group");
let notesTag = document.getElementById("notes");
let favoriteTag = document.getElementById("favorite");
let emergencyTag = document.getElementById("emergencyAdd");
let photoTagUpdate = document.getElementById("imageInputUpdate");
let nameTagUpdate = document.getElementById("nameUpdate");
let numberTagUpdate = document.getElementById("numberUpdate");
let emailTagUpdate = document.getElementById("emailUpdate");
let addressTagUpdate = document.getElementById("addressUpdate");
let groupTagUpdate = document.getElementById("groupUpdate");
let notesTagUpdate = document.getElementById("notesUpdate");
let favoriteTagUpdate = document.getElementById("favoriteUpdate");
let emergencyTagUpdate = document.getElementById("emergencyUpdate");

DisplayAll();

function DisplayAll() {
  contactsList = GetFromLocalStorage();
  DisplayContacts();
  DisplayFavorites();
  DisplayEmergency();
  DisplayCounts();
}

function DisplayContacts() {
  let contactsContainerTag = document.getElementById("contacts-container");
  let contactsContainerMessage = document.getElementById(
    "contacts-container-message"
  );

  if (contactsList.length == 0) {
    contactsContainerMessage.classList.remove("d-none");
    contactsContainerTag.innerHTML = "";
    return;
  }

  let container = "";
  for (let i = 0; i < contactsList.length; i++) {
    let contact = contactsList[i];
    container += `
                  <div class="col-lg-6 p-2">
                  <div
                    class="item border h-100 d-flex flex-column justify-content-between border-1 rounded-4 overflow-hidden border-secondary border-opacity-25 bg-white"
                  >
                    <div class="p-3">
                      <div class="d-flex gap-3 align-items-center">
                        <div
                          class="initial position-relative p-4 border border-0 rounded-4 ${
                            i % 3 ? "bg-danger" : "orange-gradient"
                          } "
                        >
                          ${
                            contact.photo
                              ? `<img src="${contact.photo}" alt="photo" class="w-100" />`
                              : `<span class="text-uppercase fw-bolder text-white"
                            >${contact.name[0]}</span
                          >`
                          }
                          <div
                            class="position-absolute ${
                              contact.isFavorite ? "" : "d-none"
                            } favorite-tag text-white border border-2 border-white rounded-circle orange-gradient fs-8 top-0 end-0"
                          >
                            <i class="fa-solid fa-star m-2"></i>
                          </div>
                          <div
                            class="position-absolute ${
                              contact.isEmergency ? "" : "d-none"
                            } emergency-tag text-white border border-2 border-white rounded-circle red-gradient fs-8 bottom-0 end-0"
                          >
                            <i class="fa-solid fa-heart-pulse m-2"></i>
                          </div>
                        </div>
                        <div>
                          <h4 class="name m-0 fs-5 fw-bold">${contact.name}</h4>
                          <div class="d-flex gap-2 align-items-center">
                            <div
                              class="border border-0 rounded-3 light-blue-bg fs-8 fw-semibold"
                            >
                              <i
                                class="fa-solid fa-phone m-2"
                                style="color: #155dfc"
                              ></i>
                            </div>
                            <p class="m-0 fs-6 text-secondary">${
                              contact.number
                            }</p>
                          </div>
                        </div>
                      </div>
          
                        <div class="my-3 ${
                          contact.email ? "" : "d-none"
                        } d-flex gap-2 align-items-center">
                          <div
                            class="purple-color light-purple-bg d-inline-block border border-0 rounded-3 fs-7"
                          >
                            <i class="fa-solid fa-envelope m-2 fs-8"></i>
                          </div>
                          <p id="emailPlaceholder" class="m-0 text-secondary">
                            ${contact.email}
                          </p>
                        </div>
                        <div class="my-3 ${
                          contact.address ? "" : "d-none"
                        } d-flex gap-2 align-items-center">
                          <div
                            class="green-color light-green-bg d-inline-block border border-0 rounded-3 fs-7"
                          >
                            <i class="fa-solid fa-location-dot m-2 fs-8"></i>
                          </div>
                          <p id="addressPlaceholder" class="m-0 text-secondary">
                            ${contact.address}
                          </p>
                        </div>
                      <div class="mt-3 ${
                        contact.group == "Family" || contact.isEmergency
                          ? ""
                          : "d-none"
                      } fs-8 fw-semibold d-flex gap-2">
                        <span
                          class="border border-0 ${
                            contact.group == "Family" ? "" : "d-none"
                          } rounded-pill p-2 blue-color light-blue-bg"
                        >
                          Family</span
                        >
                        <span
                          class="border ${
                            contact.isEmergency ? "" : "d-none"
                          } border-0 rounded-pill p-2 text-danger light-red-bg"
                          ><i class="fa-solid fa-heart-pulse"></i>
                          Emergency</span
                        >
                      </div>
                    </div>
                    <div
                      class="d-flex justify-content-between border-top border-1 p-3 border-opacity-10 bg-secondary bg-opacity-10"
                    >
                      <div>
                        <div
                          class="phone-icon number-icon green-color light-green-bg cursor-pointer d-inline-block border border-0 rounded-3 fs-7"
                        ><a href="tel:+2${contact.number}">
                            <i class="fa-solid fa-phone m-2"></i>
                        </a>
                        </div>
                        <div
                          class="email-icon ${
                            contact.email ? "" : "d-none"
                          } purple-color light-purple-bg d-inline-block cursor-pointer border border-0 rounded-3 fs-7"
                        ><a href="mailto:${contact.email}">
                            <i class="fa-solid fa-envelope m-2"></i>
                        </a>
                        </div>
                      </div>
                      <div>
                        <div
                          class="favorite-icon ${
                            contact.isFavorite ? `light-orange-bg` : ``
                          } cursor-pointer d-inline-block border border-0 rounded-3 fs-7"
                        >${
                          contact.isFavorite
                            ? `<i
                            class="fa-solid fa-star m-2"
                            style="color: #ffd43b"
                          ></i>`
                            : `<i class="fa-regular fa-star m-2"></i>`
                        }
                          
                        </div>
                        <div
                          class="emergency-icon ${
                            contact.isEmergency ? `light-red-bg` : ``
                          } text-danger cursor-pointer d-inline-block border border-0 rounded-3 fs-7"
                        >
                          ${
                            contact.isEmergency
                              ? `<i class="fa-solid fa-heart-pulse m-2"></i>`
                              : `<i class="fa-regular fa-heart m-2"></i>`
                          }
                        </div>
                        <div
                          class="edit-icon text-secondary cursor-pointer d-inline-block border border-0 rounded-3 fs-7"
                        >
                          <i class="fa-solid fa-pencil m-2"></i>
                        </div>
                        <div
                          class="delete-icon text-secondary cursor-pointer d-inline-block border border-0 rounded-3 fs-7"
                        >
                          <i class="fa-solid fa-trash m-2"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>`;
  }
  contactsContainerMessage.classList.add("d-none");
  contactsContainerTag.innerHTML = container;
  AddEvents();
}

function ClearFields() {
  nameTag.value = "";
  numberTag.value = "";
  emailTag.value = "";
  addressTag.value = "";
  groupTag.options[groupTag.selectedIndex].text = "";
  notesTag.value = "";
  favoriteTag.checked = false;
  emergencyTag.checked = false;
  photoTag.value = "";
}

function DisplayFavorites() {
  let favoritesContainerTag = document.getElementById("favorites-container");
  let favoritesContainerMessage = document.getElementById(
    "favorites-container-message"
  );

  if (
    contactsList.length == 0 ||
    !contactsList.find((contact) => contact.isFavorite)
  ) {
    favoritesContainerMessage.classList.remove("d-none");
    favoritesContainerTag.innerHTML = "";
    return;
  }

  let container = "";
  for (let i = 0; i < contactsList.length; i++) {
    let contact = contactsList[i];
    if (contact.isFavorite) {
      container += `<div class="item-container border border-0 rounded-3 p-2">
                      <div
                        class="item cursor-pointer d-flex justify-content-between align-items-center"
                      >
                        <div class="d-flex gap-2 align-items-center">
                          <div
                            class="initial p-3 px-4 d-inline-block border border-0 rounded-4 ${
                              i % 3 ? "bg-danger" : "orange-gradient"
                            }"
                          >
                            <span class="text-uppercase fw-bolder text-white"
                              >${contact.name[0]}</span
                            >
                          </div>
                          <div>
                            <h3 class="m-0 fw-semibold fs-6">${
                              contact.name
                            }</h3>
                            <p class="text-secondary m-0 fs-7">${
                              contact.number
                            }</p>
                          </div>
                        </div>
                        <div
                          class="phone-icon green-color light-green-bg cursor-pointer d-inline-block border border-0 rounded-3 fs-6"
                        >
                        <a href="tel:+2${contact.number}">
                            <i class="fa-solid fa-phone m-2"></i>
                        </a>
                        </div>
                      </div>
                    </div>`;
    }
  }
  favoritesContainerMessage.classList.add("d-none");
  favoritesContainerTag.innerHTML = container;
}

function DisplayEmergency() {
  let emergencyContainerTag = document.getElementById("emergency-container");
  let emergencyContainerMessage = document.getElementById(
    "emergency-container-message"
  );

  if (
    contactsList.length == 0 ||
    !contactsList.find((contact) => contact.isEmergency)
  ) {
    emergencyContainerMessage.classList.remove("d-none");
    emergencyContainerTag.innerHTML = ``;
    return;
  }

  let container = "";
  for (let i = 0; i < contactsList.length; i++) {
    let contact = contactsList[i];
    if (contact.isEmergency) {
      container += `<div class="item-container border border-0 rounded-3 p-2">
                    <div
                      class="item cursor-pointer d-flex justify-content-between align-items-center"
                    >
                      <div class="d-flex gap-2 align-items-center">
                        <div
                          class="initial p-3 px-4 d-inline-block border border-0 rounded-4 ${
                            i % 3 ? "bg-danger" : "orange-gradient"
                          }"
                        >
                          <span class="text-uppercase fw-bolder text-white"
                            >${contact.name[0]}</span
                          >
                        </div>
                        <div>
                          <h3 class="m-0 fw-semibold fs-6">${contact.name}</h3>
                          <p class="text-secondary m-0 fs-7">${
                            contact.number
                          }</p>
                        </div>
                      </div>
                      <div
                        class="phone-icon-red text-danger light-red-bg cursor-pointer d-inline-block border border-0 rounded-3 fs-6"
                      >
                        <a href="tel:+2${contact.number}">
                            <i class="fa-solid fa-phone m-2"></i>
                        </a>
                      </div>
                    </div>
                  </div>`;
    }
  }
  emergencyContainerMessage.classList.add("d-none");
  emergencyContainerTag.innerHTML = container;
}

function DisplayCounts() {
  let totalCount = document.getElementById("total-count");
  totalCount.innerHTML = contactsList.length;

  let total = document.getElementById("total");
  total.innerHTML = contactsList.length;

  let favorites = document.getElementById("favorites");
  favorites.innerHTML = contactsList.filter(
    (contact) => contact.isFavorite === true
  ).length;

  let emergency = document.getElementById("emergency");
  emergency.innerHTML = contactsList.filter(
    (contact) => contact.isEmergency === true
  ).length;
}

function AddContact() {
  if (!CheckNameRegex(nameTag.value)) {
    FailureAlert("Missing Name", "Please enter a name for the contact!");
    return;
  }

  if (!CheckNumberRegex(numberTag.value)) {
    FailureAlert("Missing Phone", "Please enter a phone number!");
    return;
  }

  let duplicateContact = CheckPhoneDuplicate(numberTag.value);
  if (duplicateContact !== undefined) {
    FailureAlert(
      "Duplicate Phone Number",
      `A contact with this phone number already exists: ${duplicateContact.name}`
    );
    return;
  }

  let contact = {
    name: nameTag.value,
    number: numberTag.value,
    email: emailTag.value,
    address: addressTag.value,
    group: groupTag.options[groupTag.selectedIndex].text,
    notes: notesTag.value,
    isFavorite: favoriteTag.checked,
    isEmergency: emergencyTag.checked,
    photo: photoTag.value,
  };

  contactsList.push(contact);
  SaveToLocalStorage();
  CloseAddModal();
  SuccessAlert("Contact had been added successfully");
  ClearFields();
}

function AddEvents() {
  let deleteButtons = document.querySelectorAll(".delete-icon");
  let favoriteButtons = document.querySelectorAll(".favorite-icon");
  let emergencyButtons = document.querySelectorAll(".emergency-icon");
  let editButtons = document.querySelectorAll(".edit-icon");

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function () {
      DeleteContact(i);
    });
  }

  for (let i = 0; i < favoriteButtons.length; i++) {
    favoriteButtons[i].addEventListener("click", function () {
      FavoriteToggle(i);
    });
  }

  for (let i = 0; i < emergencyButtons.length; i++) {
    emergencyButtons[i].addEventListener("click", function () {
      EmergencyToggle(i);
    });
  }

  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener("click", function () {
      EditContact(i);
    });
  }
}

function CloseAddModal() {
  document.getElementById("closeAdd").click();
}

function CloseEditModal() {
  document.getElementById("closeEdit").click();
}

function Search() {
  let contactsContainerTag = document.getElementById("contacts-container");
  let contactsContainerMessage = document.getElementById(
    "contacts-container-message"
  );

  if (contactsList.length == 0) {
    contactsContainerMessage.classList.remove("d-none");
    contactsContainerTag.innerHTML = "";
    return;
  }

  let container = "";
  for (let i = 0; i < contactsList.length; i++) {
    let contact = contactsList[i];
    if (contact.name.toLowerCase().includes(search.value))
      container += `
                  <div class="col-lg-6 p-2">
                  <div
                    class="item border h-100 d-flex flex-column justify-content-between border-1 rounded-4 overflow-hidden border-secondary border-opacity-25 bg-white"
                  >
                    <div class="p-3">
                      <div class="d-flex gap-3 align-items-center">
                        <div
                          class="initial position-relative p-4 border border-0 rounded-4 ${
                            i % 3 ? "bg-danger" : "orange-gradient"
                          } "
                        >
                          ${
                            contact.photo
                              ? `<img src="${contact.photo}" alt="photo" class="w-100" />`
                              : `<span class="text-uppercase fw-bolder text-white"
                            >${contact.name[0]}</span
                          >`
                          }
                          <div
                            class="position-absolute ${
                              contact.isFavorite ? "" : "d-none"
                            } favorite-tag text-white border border-2 border-white rounded-circle orange-gradient fs-8 top-0 end-0"
                          >
                            <i class="fa-solid fa-star m-2"></i>
                          </div>
                          <div
                            class="position-absolute ${
                              contact.isEmergency ? "" : "d-none"
                            } emergency-tag text-white border border-2 border-white rounded-circle red-gradient fs-8 bottom-0 end-0"
                          >
                            <i class="fa-solid fa-heart-pulse m-2"></i>
                          </div>
                        </div>
                        <div>
                          <h4 class="name m-0 fs-5 fw-bold">${contact.name}</h4>
                          <div class="d-flex gap-2 align-items-center">
                            <div
                              class="border border-0 rounded-3 light-blue-bg fs-8 fw-semibold"
                            >
                              <i
                                class="fa-solid fa-phone m-2"
                                style="color: #155dfc"
                              ></i>
                            </div>
                            <p class="m-0 fs-6 text-secondary">${
                              contact.number
                            }</p>
                          </div>
                        </div>
                      </div>
          
                        <div class="my-3 ${
                          contact.email ? "" : "d-none"
                        } d-flex gap-2 align-items-center">
                          <div
                            class="purple-color light-purple-bg d-inline-block border border-0 rounded-3 fs-7"
                          >
                            <i class="fa-solid fa-envelope m-2 fs-8"></i>
                          </div>
                          <p id="emailPlaceholder" class="m-0 text-secondary">
                            ${contact.email}
                          </p>
                        </div>
                        <div class="my-3 ${
                          contact.address ? "" : "d-none"
                        } d-flex gap-2 align-items-center">
                          <div
                            class="green-color light-green-bg d-inline-block border border-0 rounded-3 fs-7"
                          >
                            <i class="fa-solid fa-location-dot m-2 fs-8"></i>
                          </div>
                          <p id="addressPlaceholder" class="m-0 text-secondary">
                            ${contact.address}
                          </p>
                        </div>
                      <div class="mt-3 ${
                        contact.group == "Family" || contact.isEmergency
                          ? ""
                          : "d-none"
                      } fs-8 fw-semibold d-flex gap-2">
                        <span
                          class="border border-0 ${
                            contact.group == "Family" ? "" : "d-none"
                          } rounded-pill p-2 blue-color light-blue-bg"
                        >
                          Family</span
                        >
                        <span
                          class="border ${
                            contact.isEmergency ? "" : "d-none"
                          } border-0 rounded-pill p-2 text-danger light-red-bg"
                          ><i class="fa-solid fa-heart-pulse"></i>
                          Emergency</span
                        >
                      </div>
                    </div>
                    <div
                      class="d-flex justify-content-between border-top border-1 p-3 border-opacity-10 bg-secondary bg-opacity-10"
                    >
                      <div>
                        <div
                          class="phone-icon number-icon green-color light-green-bg cursor-pointer d-inline-block border border-0 rounded-3 fs-7"
                        ><a href="tel:+2${contact.number}">
                            <i class="fa-solid fa-phone m-2"></i>
                        </a>
                        </div>
                        <div
                          class="email-icon ${
                            contact.email ? "" : "d-none"
                          } purple-color light-purple-bg d-inline-block cursor-pointer border border-0 rounded-3 fs-7"
                        ><a href="mailto:${contact.email}">
                            <i class="fa-solid fa-envelope m-2"></i>
                        </a>
                        </div>
                      </div>
                      <div>
                        <div
                          class="favorite-icon ${
                            contact.isFavorite ? `light-orange-bg` : ``
                          } cursor-pointer d-inline-block border border-0 rounded-3 fs-7"
                        >${
                          contact.isFavorite
                            ? `<i
                            class="fa-solid fa-star m-2"
                            style="color: #ffd43b"
                          ></i>`
                            : `<i class="fa-regular fa-star m-2"></i>`
                        }
                          
                        </div>
                        <div
                          class="emergency-icon ${
                            contact.isEmergency ? `light-red-bg` : ``
                          } text-danger cursor-pointer d-inline-block border border-0 rounded-3 fs-7"
                        >
                          ${
                            contact.isEmergency
                              ? `<i class="fa-solid fa-heart-pulse m-2"></i>`
                              : `<i class="fa-regular fa-heart m-2"></i>`
                          }
                        </div>
                        <div
                          class="edit-icon text-secondary cursor-pointer d-inline-block border border-0 rounded-3 fs-7"
                        >
                          <i class="fa-solid fa-pencil m-2"></i>
                        </div>
                        <div
                          class="delete-icon text-secondary cursor-pointer d-inline-block border border-0 rounded-3 fs-7"
                        >
                          <i class="fa-solid fa-trash m-2"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>`;
  }
  contactsContainerMessage.classList.add("d-none");
  contactsContainerTag.innerHTML = container;
  AddEvents();
}

function FavoriteToggle(index) {
  contactsList[index].isFavorite = !contactsList[index].isFavorite;
  SaveToLocalStorage();
  DisplayAll();
}

function EmergencyToggle(index) {
  contactsList[index].isEmergency = !contactsList[index].isEmergency;
  SaveToLocalStorage();
  DisplayAll();
}

async function DeleteContact(index) {
  if (await DeleteAlert()) {
    contactsList.splice(index, 1);
  }
  SaveToLocalStorage();
  DisplayAll();
}

function EditContact(index) {
  let modal = new bootstrap.Modal(document.getElementById("editModal"));
  modal.show();
  nameTagUpdate.value = contactsList[index].name;
  numberTagUpdate.value = contactsList[index].number;
  emailTagUpdate.value = contactsList[index].email;
  addressTagUpdate.value = contactsList[index].address;
  groupTagUpdate.options[groupTagUpdate.selectedIndex].text =
    contactsList[index].group;
  notesTagUpdate.value = contactsList[index].notes;
  favoriteTagUpdate.checked = contactsList[index].isFavorite;
  emergencyTagUpdate.checked = contactsList[index].isEmergency;
  photoTagUpdate.value = contactsList[index].photo;
  contactsList.splice(index, 1);
}

function UpdateContact() {
  if (!CheckNameRegex(nameTagUpdate.value)) {
    FailureAlert("Missing Name", "Please enter a name for the contact!");
    return;
  }

  if (!CheckNumberRegex(numberTagUpdate.value)) {
    FailureAlert("Missing Phone", "Please enter a phone number!");
    return;
  }

  let contact = {
    name: nameTagUpdate.value,
    number: numberTagUpdate.value,
    email: emailTagUpdate.value,
    address: addressTagUpdate.value,
    group: groupTagUpdate.options[groupTagUpdate.selectedIndex].text,
    notes: notesTagUpdate.value,
    isFavorite: favoriteTagUpdate.checked,
    isEmergency: emergencyTagUpdate.checked,
    photo: photoTagUpdate.value,
  };
  console.log(photoTagUpdate);

  contactsList.push(contact);
  SaveToLocalStorage();
  CloseEditModal();
  SuccessAlert("Contact had been updated successfully");
  ClearFields();
  DisplayAll();
}

function CheckNameRegex(nameParam = nameTag.value) {
  let nameRegex = /^[A-Za-z ]{2,50}$/;
  let name = nameParam;
  let nameValidation = document.getElementById("name-validation");
  if (!RegexValidation(nameRegex, name)) {
    nameValidation.classList.add("d-block");
    nameValidation.classList.remove("d-none");
    nameTag.classList.add("border-danger");
    return false;
  } else {
    nameValidation.classList.add("d-none");
    nameValidation.classList.remove("d-block");
    nameTag.classList.remove("border-danger");
    return true;
  }
}

function CheckNumberRegex(numberParam = numberTag.value) {
  let numberRegex = /^01[0125]\d{8}$/;
  let number = numberParam;
  let numberValidation = document.getElementById("number-validation");
  if (!RegexValidation(numberRegex, number)) {
    numberValidation.classList.add("d-block");
    numberValidation.classList.remove("d-none");
    numberValidation.classList.add("border-danger");
    return false;
  } else {
    numberValidation.classList.add("d-none");
    numberValidation.classList.remove("d-block");
    numberValidation.classList.remove("border-danger");
    return true;
  }
}

function CheckEmailRegex(emailParam = emailTag.value) {
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let email = emailParam;
  let emailValidation = document.getElementById("email-validation");
  if (!RegexValidation(emailRegex, email)) {
    emailValidation.classList.add("d-block");
    emailValidation.classList.remove("d-none");
    emailValidation.classList.add("border-danger");
    return false;
  } else {
    emailValidation.classList.add("d-none");
    emailValidation.classList.remove("d-block");
    emailValidation.classList.remove("border-danger");
    return true;
  }
}

function CheckPhoneDuplicate(number) {
  return contactsList.find((contact) => contact.number === number);
}

function RegexValidation(regexExpression, input) {
  return regexExpression.test(input);
}

function SaveToLocalStorage() {
  localStorage.setItem("contactsList", JSON.stringify(contactsList));
}

function GetFromLocalStorage() {
  return JSON.parse(localStorage.getItem("contactsList"));
}

function SuccessAlert(content) {
  Swal.fire({
    title: content,
    icon: "success",
    draggable: true,
  });
}

function FailureAlert(title, content) {
  Swal.fire({
    icon: "error",
    title: title,
    text: content,
  });
}

async function DeleteAlert() {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    await Swal.fire({
      title: "Deleted!",
      text: "Your contact has been deleted.",
      icon: "success",
    });
    return true;
  }
  return false;
}
