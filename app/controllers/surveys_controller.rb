class SurveysController < ApplicationController
  include ApplicationHelper
  
  before_action :set_survey, only: [:show, :edit, :update, :destroy, :new_step, :edit_step, :edit_questions, :update_questions, :create_reply]
  before_action :set_reply, only: [:new_reply, :create_reply]

  layout 'public', only: [:new_reply, :confirm]

  def index
    @surveys = Survey.all
  end

  def confirm
  end

  def show
  end

  def new
    @survey = Survey.new
  end

  def edit
  end

  def edit_questions
    @survey.pages = [Page.new] if @survey.pages.empty?
  end
  
  def new_reply
    @survey = @reply.survey
    @page_number = params[:page_number] || 1
    @page = @survey.get_page_for_reply @reply, @page_number.to_i
    recipient_data = @reply.mail_message.survey
    .users_data[@reply.recipient.email]
    render text: translate_tags(recipient_data, render_to_string(:new_reply)), layout: false
  end

  def create_reply
    @survey.update reply_params
    reply = @survey.replies.find_by(link_hash: params[:link_hash])
    page_number = params[:page_number]
    next_page = @survey.next_page_for_reply reply, page_number.to_i
    unless next_page 
      redirect_to confirm_surveys_path
    else
      redirect_to new_reply_survey_path(link_hash: params[:link_hash], page_number: next_page)
    end
  end

  def create
    @survey = Survey.new(survey_params)
    if @survey.save
      redirect_to edit_questions_survey_path(@survey), notice: 'Survey was successfully created.'
    else
      render :new 
    end
  end

  def update
    if @survey.update(survey_params)
      redirect_to edit_survey_path(@survey), notice: 'Survey was successfully updated.'
    else 
      render :edit
    end
  end

  def update_questions
    if @survey.update(survey_questions_params)
      redirect_to edit_questions_survey_path(@survey), notice: 'Survey was successfully updated.'
    else
      render :edit_questions
    end
  end

  def destroy
    @survey.destroy
    respond_to do |surveyat|
      surveyat.html { redirect_to surveys_url, notice: 'Survey was successfully destroyed.' }
      surveyat.json { head :no_content }
    end
  end

  private
  def set_survey
    @survey = Survey.find(params[:id])
  end

  def set_reply
    @reply = Reply.find_by link_hash: params[:link_hash]
  end

  def reply_params
    params.require(:survey).permit(replies_attributes: [ :id, { answers_attributes: [ :id, :item_id, :value, { value: [] } ] }])
  end

  def survey_params
    params.require(:survey).permit(:name, :title, :users_data_file, :email_tag)
  end

  def survey_questions_params
    params.require(:survey).permit(pages_attributes: [:id, :sequence, :_destroy, { 
      conditions_attributes: [ :id, :_destroy, :reference_type, :reference, :comparator, :value ],
      items_attributes: [
        :id, :_destroy, :sequence, :actable_type,
        { conditions_attributes: [ :id, :_destroy, :reference_type, :reference, :comparator, :value ],
          actable_attributes: 
          [
            :id, :_destroy, :title, :number, :description, :is_required,
            :accepts_multiple, { alternatives_attributes: [:id, :_destroy, :value]},
            :content 
          ]
        }
      ]
      }])
  end
end
