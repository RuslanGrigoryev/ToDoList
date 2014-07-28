$(function () {
	var $input = $('#newTodo'),
	    $inner = $('#inner'),
	    $itemLength = 20;

	   // если еще не было ничего записано в localStorage
	   if (!localStorage.getItem('Todoitem1')) {

		  for (var i = 1; i < $itemLength; i++) {
		  	localStorage.setItem("Todoitem"+i, "empty");
		  }
	   	
	   }// если было, то берем значения из localStorage и создаем новый список
	   else {
	   		for (var i = 1; i < $itemLength; i++) {
	   			if ( localStorage.getItem('Todoitem' + i) != "empty" ) {
	   				$inner.append("<li class='list__item'>"+localStorage.getItem('Todoitem'+i)+"<a href='#' class='list__link'>X</a>"+"</li>");
	   			}	
	   		}
	   }
	  
	$input.keyup(function(event) {
		var $self = $(this),
		    $val  = $self.val();

			if (event.keyCode == 13) {

				for ( var i = 1; i < $itemLength; i++ ) {

					if (localStorage.getItem("Todoitem"+i) == "empty") {

						localStorage.setItem("Todoitem"+i, $val);
						$inner.append("<li class='list__item'>" + $val + "<a href='#' class='list__link'>X</a>" + "</li>");
						$self.val("");

						return;

					}

				}

			}
	});

	$('.list__link').on('click', function (e) {

		$(this).closest('.list__item').remove();

		return false;
	});

});



// 1. Нужно добавить значки редактирования и удаления элементов из списка дел
//    - как на созданный элемент повесить обработчик ?