const image = document.getElementById("whatever_you_want");
image.src = 'img/<%=data["_id"]%>.png';
console.log(image.src)