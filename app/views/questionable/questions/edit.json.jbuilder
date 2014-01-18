# json.extract! @question, :id, :title, :content

json.set! :id, @question.id
json.set! :title, @question.title
json.set! :content, @question.content
json.set! :form_url, question_path(@question)
json.set! :cancel_url, questions_path()
json.set! :form_method, "PUT"
json.set! :button_name, "Update"
json.set! :tmplt, "question/edit"
