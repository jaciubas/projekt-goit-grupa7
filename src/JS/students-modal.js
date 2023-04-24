const studentsLink = document.getElementById('students-modal');
const modalContainer = document.getElementById('students-container');
studentsLink.addEventListener('click', openModal);
modalContainer.addEventListener('click', closeModal);
function openModal() {
  modalContainer.removeAttribute('.class');
  modalContainer.classList.add('appear');
  document.body.classList.add('students-active');
}
function closeModal() {
  modalContainer.classList.add('disappear');
  document.body.classList.remove('students-active');
  setTimeout(() => {
    modalContainer.classList.remove('appear');
    modalContainer.classList.remove('disappear');
  }, 1500);
}


/*$(document).ready(function() {
    // Get the modal
    const modalStudents = document.getElementById(team-modal);
    // Get the link that opens the modal
    const link = document.getElementById(team-link);
    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName(".modal-students-close")[0];
    // When the user clicks the link, open the modal
    link.onclick = function(e) {
      e.preventDefault();
      modalStudents.style.display = "block";
    };
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modalStudents.style.display = "none";
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modalStudents) {
        modalStudents.style.display = "none";
      }
    };
  });
*/
/*
  (() => {
    const refs = {
      openModalBtn: document.querySelector("[data-modal-open]"),
      closeModalBtn: document.querySelector("[data-modal-close]"),
      modal: document.querySelector("[data-modal]"),
    };
    refs.openModalBtn.addEventListener("click", toggleModal);
    refs.closeModalBtn.addEventListener("click", toggleModal);
    function toggleModal() {
      refs.modal.classList.toggle("is-hidden");
    }
  })();
  */
