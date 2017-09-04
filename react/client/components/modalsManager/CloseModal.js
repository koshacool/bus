/**
 * Click on button by name
 *
 * @param {string} name Param to add to class name
 * @return {void}
 */
const closeModal = (name) => {
  const buttonId = name ? `closeModal${name}` : 'closeModal';
  document.getElementById(buttonId).click();
};

export default closeModal;
