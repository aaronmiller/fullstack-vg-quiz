// Append year to span
{
  let date = new Date();
  let yearSpan = document.querySelector('.year');
  yearSpan.innerHTML = date.getFullYear();
}
