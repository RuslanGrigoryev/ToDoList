$(function () {
	var $input = $('#newTodo'),
	    $inner = $('#inner'),
	    $innerDone = $('#innerDone'),
	    $ITEMLENGTH = 10,
	    $editElem = null;

	   // если еще не было ничего записано в localStorage
	   if (!localStorage.getItem('Todoitem1') && !localStorage.getItem('TodoitemDone1')) {

		  for (var i = 1; i < $ITEMLENGTH; i++) {
		  	localStorage.setItem("Todoitem"+i, "empty");
		  	localStorage.setItem("TodoitemDone"+i, "empty");
		  }
	   	
	   }// если было, то берем значения из localStorage и создаем новый список
	   else {
	   		for (var i = 1; i < $ITEMLENGTH; i++) {
	   			if ( localStorage.getItem('Todoitem' + i) != "empty" ) {
	   				$inner.append("<li class='list__item'>"+ "<a href='#' class='list__link list__link--done'></a>" + "<span class='list__item_span'>" + localStorage.getItem('Todoitem'+i) + "</span>" + "<a href='#' class='list__link list__link--edit'></a>" + "<a href='#' class='list__link list__link--close'></a>"+"</li>");
	   			}	
	   			if ( localStorage.getItem('TodoitemDone' + i) != "empty" ) {
	   				$innerDone.append("<li class='list__item'>" + "<span class='list__item_span'>" + localStorage.getItem('TodoitemDone'+i) + "</span>"+"</li>"); 				
	   			} 
	   		}
	   }
	// Обработчик создания дела
	$input.keyup(function(event) {
		var $self = $(this),
		    $val  = $self.val();

			if (event.keyCode == 13) {

				for ( var i = 1; i < $ITEMLENGTH; i++ ) {

					if (localStorage.getItem("Todoitem"+i) == "empty") {

						localStorage.setItem("Todoitem"+i, $val);
						$inner.append("<li class='list__item'>"+ "<a href='#' class='list__link list__link--done'></a>" + "<span class='list__item_span'>" + $val + "</span>" + "<a href='#' class='list__link list__link--edit'></a>"  + "<a href='#' class='list__link list__link--close'></a>" + "</li>");
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

		    for ( var i = 0; i < $ITEMLENGTH; i++ ) {
		    	if (localStorage.getItem("Todoitem"+i) == $listText) {

		    		localStorage.setItem("Todoitem"+i, "empty");
					$self.closest('.list__item').fadeOut('slow', function () {
						$(this).remove();						
					})

		    	}
		    }

	});

	// Обработчик редактирования дела
	$('.list').on('click', '.list__link--edit', function (e) {
		e.preventDefault();

		var $self     = $(this),
			$spanElem = $self.siblings('.list__item_span'),
		    $spanText = $spanElem.text();

		    for (var i=1; i < $ITEMLENGTH; i++) {
		    	if ( localStorage.getItem("Todoitem"+i) == $spanText ) {
		    		$editElem = i;
		    	}
		    }

		    $spanElem.remove();
		    $self.closest('.list__item').prepend("<input type='text' class='list__item__input' />")
		    $self.siblings('.list__item__input').val($spanText);

	});

	// Обработчик ввода редактирования уже введенного дела

	$('.list').on('keyup', '.list__item__input', function () {

		var $self = $(this),
		    $val  = $self.val();

			if (event.keyCode == 13) {

				localStorage.setItem("Todoitem"+$editElem, $val);
				$self.closest('.list__item').remove();
				$inner.append("<li class='list__item'>" + "<a href='#' class='list__link list__link--done'></a>"+ "<span class='list__item_span'>" + $val + "</span>" + "<a href='#' class='list__link list__link--edit'></a>"  + "<a href='#' class='list__link list__link--close'></a>" + "</li>");
				

			}

	});

	// Обработчик клика по ссылке done

	$('.list').on('click', '.list__link--done', function (e) {

		e.preventDefault();

		var $self     = $(this),
			$spanElem = $self.siblings('.list__item_span'),
		    $spanText = $spanElem.text();

		$self.toggleClass('list__link--done--active').closest('.list__item').fadeOut('slow', function() {

			console.log($spanText);

			for (var i=1; i < $ITEMLENGTH; i++) {
				if ( localStorage.getItem("Todoitem"+i) == $spanText ) {
					$editElem = i;
				}
			}

			localStorage.setItem("Todoitem" + $editElem, "empty");
			localStorage.setItem("TodoitemDone" + $editElem, $spanText);

			$innerDone.prepend("<li class='list__item'>"+"<span class='list__item_span'>" +localStorage.getItem("TodoitemDone" + $editElem) + "</span>" +"</li>");



			$(this).remove();
		});

	});

	// Очистка localstorage
	$('#clear').on('click', function () {

		localStorage.clear();
		$('.list__item').remove();	
		return false;
	})

	// Сортировка  невыполненных дел
	$inner.sortable({
		placeholder: "ui-state-highlight",
		cursor     : "move",
		revert     : true
	});

});
