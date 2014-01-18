# @questions.each do |q|
#   json.questions q, :title, :content
# end

# @questions.each do |q|
#   #json.set! :questions do
#     json.set! :title, q.title 
#     json.set! :content, q.content
#     json.set! :show_url, question_path(q)
#     json.set! :edit_url, edit_question_path(q)
#     json.set! :delete_url, question_path(q)
#     json.set! :tmplt, "questions/index"
#   #end
# end

json.array! @questions do |question|
  json.title "#{question.title}"
  json.content "#{question.content}"
  json.unique_id question.unique_id
  json.form_url question_path(question)
  json.form_method "put"
  json.button_name "Update"
  json.tmplt "questions/index"
  json.delete_url question_path(question)
  json.answer_count question.answers_count
  json.answers_url question_answers_path(:question_id => question.unique_id)
end
