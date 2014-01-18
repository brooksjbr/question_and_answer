json = Jbuilder.encode do |json|
  json.question do
    json.title @question.title
    json.content @question.content
    json.unique_id @question.unique_id
    json.id @question.id
    json.form_url question_answers_path(@question)
    json.button_name "Create"
    json.tmplt "answers/index"
    json.form_method "post"
  end
  
  json.answers @question.answers do |answer|
    json.content answer.content
    json.unique_id answer.unique_id
    json.form_url question_answer_path(question_id: @question.unique_id, id: answer.unique_id)  
    json.delete_url question_answer_path(question_id: @question.unique_id, id: answer.unique_id) 
    json.form_method "put"
  end
   
end

return json

