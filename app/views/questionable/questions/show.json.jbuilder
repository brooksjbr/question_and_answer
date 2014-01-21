json.set! :title, @question.title
json.set! :content, @question.content
json.set! :edit_url, edit_question_path(@question)
json.set! :delete_url, question_path(@question)
json.set! :home_url, questions_path()
json.set! :tmplt, "questions/show"