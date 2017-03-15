var news = {
	
	article_selector: ".page_news .article_text",
	articles_text: [],
    short_text: [],
	expand_index: 0,
	length: 900,    
	addExpandTextToArray: function () {	
        var Current = this;
		$(Current.article_selector).each(function () {

			if ($(this).text().length > Current.length) {
				var short_text = $(this).text().slice(0, Current.length);
				Current.articles_text.push($(this).text().slice(Current.length));
				$(this).attr('article-index', Current.expand_index++);
				$(this).empty().append(short_text);
                Current.short_text.push(short_text);
				$(this).append('<div class="show_more">... <span>Показать больше</span></div>')
			}
		})
	},
	expandText: function(Current) {
		$(Current).parent().append(this.articles_text[$(Current).parent().attr('article-index')]);
        $(Current).parent().append('<div class="show_less">   <span>Показать меньше</span></div>');
		$(Current).parent().find('.show_more').remove();
        
	
	},
    hideText: function (Current){
        var parent = $(Current).parent();
        parent.empty();
        parent.append(news.short_text[parent.attr('article-index')]);
        parent.append('<div class="show_more">... <span>Показать больше</span></div>');
    }
}