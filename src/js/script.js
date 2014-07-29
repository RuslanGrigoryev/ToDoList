$(function () {
	var $input = $('#newTodo'),
	    $inner = $('#inner'),
	    $itemLength = 5,
	    $editElem = null;

	   // если еще не было ничего записано в localStorage
	   if (!localStorage.getItem('Todoitem1')) {

		  for (var i = 1; i < $itemLength; i++) {
		  	localStorage.setItem("Todoitem"+i, "empty");
		  }
	   	
	   }// если было, то берем значения из localStorage и создаем новый список
	   else {
	   		for (var i = 1; i < $itemLength; i++) {
	   			if ( localStorage.getItem('Todoitem' + i) != "empty" ) {
	   				$inner.append("<li class='list__item'>"+ "<span class='list__item_span'>" + localStorage.getItem('Todoitem'+i) + "</span>" + "<a href='#' class='list__link list__link--edit'></a>" + "<a href='#' class='list__link list__link--close'></a>"+"</li>");
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
						$inner.append("<li class='list__item'>" + "<span class='list__item_span'>" + $val + "</span>" + "<a href='#' class='list__link list__link--edit'></a>"  + "<a href='#' class='list__link list__link--close'></a>" + "</li>");
						$self.val("");

						return;

					}

				}

			}
	});

	// Обработчик удаления дела
	$('.list').on('click', '.list__link--close' , function (e) {
		e.preventDefault();

		var $self     = $(this),
		    $listText = $self.closest('.list__item').text();

		    for ( var i = 0; i < $itemLength; i++ ) {
		    	if (localStorage.getItem("Todoitem"+i) == $listText) {

		    		localStorage.setItem("Todoitem"+i, "empty");
					$self.closest('.list__item').remove();

		    	}
		    }


	});

	// Обработчик редактирования дела
	$('.list').on('click', '.list__link--edit', function (e) {
		e.preventDefault();

		var $self     = $(this),
			$spanElem = $self.prev('.list__item_span'),
		    $spanText = $spanElem.text();

		    for (var i=1; i < $itemLength; i++) {
		    	if ( localStorage.getItem("Todoitem"+i) == $spanText ) {
		    		$editElem = i;
		    	}
		    }

		    $spanElem.remove();
		    $self.closest('.list__item').prepend("<input type='text' class='list__item__input' />")
		    $self.prev('.list__item__input').val($spanText);

	});

	// Обработчик ввода редактирования уже введенного дела

	$('.list').on('keyup', '.list__item__input', function () {

		var $self = $(this),
		    $val  = $self.val();

			if (event.keyCode == 13) {

				localStorage.setItem("Todoitem"+$editElem, $val);
				$self.closest('.list__item').remove();
				$inner.append("<li class='list__item'>" + "<span class='list__item_span'>" + $val + "</span>" + "<a href='#' class='list__link list__link--edit'></a>"  + "<a href='#' class='list__link list__link--close'></a>" + "</li>");
				

			}

	});

	$('#clear').on('click', function () {

		localStorage.clear();
		$('.list__item').remove();	
		return false;
	})

});


// 1. Нужно добавить значки редактирования и удаления элементов из списка дел      DONE
// 2. Как на созданный элемент повесить обработчик                                 DONE
// 3. Добавить чекбокс для выолнения дела, перед заданием                          PROCESS