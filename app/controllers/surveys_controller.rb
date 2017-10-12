class SurveysController < ApplicationController
  include ApplicationHelper

  layout 'public', only: [:new_reply, :confirm]
  before_action :set_survey, only: [:invite, :results, :edit, :update, :destroy, :new_step, :edit_step, :edit_questions, :update_questions, :create_reply]
  before_action :set_recipient, only: [:new_reply, :create_reply]

  def index
    authorize_namespace Survey
    @surveys = current_user.survey
  end

  def confirm
  end

  def new
    authorize_namespace Survey
    @survey = Survey.new
  end

  def edit
    authorize_namespace @survey
  end

  def invite
    authorize_namespace @survey
  end

  def edit_questions
    authorize_namespace @survey
    @survey.pages = [Page.new] if @survey.pages.empty?
  end

  def new_reply
    @survey = @recipient.survey
    @page_number = params[:page_number] || 1
    @page = @survey.get_page_for_recipient @recipient, @page_number.to_i
    recipient_data = @survey.users_data[@recipient.email]
    render text: translate_tags(recipient_data, render_to_string(:new_reply)), layout: false
  end

  def create_reply
    @survey.update reply_params
    page_number = params[:page_number]
    next_page = @survey.next_page_for_recipient @recipient, page_number.to_i
    unless next_page
      redirect_to confirm_surveys_path
    else
      redirect_to new_reply_survey_path(link_hash: params[:link_hash], page_number: next_page)
    end
  end

  def create
    authorize_namespace Survey

    @survey = Survey.new(survey_params)
    if @survey.save && current_user.add_role(:owner, @survey)
      redirect_to edit_questions_survey_path(@survey), notice: 'Survey was successfully created.'
    else
      render :new
    end
  end

  def update
    authorize_namespace @survey

    if @survey.update(survey_params)
      redirect_to edit_survey_path(@survey), notice: 'Survey was successfully updated.'
    else
      render :edit
    end
  end

  def update_questions
    authorize_namespace @survey

    if @survey.update(survey_questions_params)
      redirect_to edit_questions_survey_path(@survey), notice: 'Survey was successfully updated.'
    else
      render :edit_questions
    end
  end

  def destroy
    authorize_namespace @survey

    @survey.destroy
    respond_to do |surveyat|
      surveyat.html { redirect_to surveys_url, notice: 'Survey was successfully destroyed.' }
      surveyat.json { head :no_content }
    end
  end

  def results
  end

  def invite
    authorize_namespace @survey

    if request.get?
    else
      emails = invite_params[:emails].split(',').map(&:strip)
      User.invite_all emails, @survey
      redirect_to surveys_path, notice: "Users invited successfully."
    end
  end

  private

  def invite_params
    params.require(:users).permit(:emails)
  end

  def set_survey
    @survey = Survey.find(params[:id])
  end

  def set_recipient
    @recipient = Recipient.find_by link_hash: params[:link_hash]
  end

  def reply_params
    params.require(:survey).permit(recipients_attributes: [ :id, { answers_attributes: [ :id, :item_id, :value, { value: [] } ] }])
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
