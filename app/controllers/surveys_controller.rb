class SurveysController < ApplicationController
  include ApplicationHelper
  before_action :set_survey, only: [:show, :edit, :update, :destroy, :new_step, :edit_step, :edit_questions, :update_questions]
  before_action :set_reply, only: [:new_reply, :create_reply]

  layout 'coopera', only: [:new_reply, :confirm]

  # GET /surveys
  def index
    @surveys = Survey.all
  end

  # GET /surveys/confim
  def confirm
  end

  # GET /surveys/1
  def show
  end

  # GET /surveys/new
  def new
    @survey = Survey.new
    # @survey.items << Question.new(order: 1, number: 1)
  end

  # GET /surveys/1/edit
  def edit
  end

  def edit_questions
  end
  
  # GET /surveys/new_reply
  def new_reply
    @survey = @reply.survey
    recipient_data = @reply.mail_message.survey
      .users_data[@reply.recipient.email]
    render text: translate_tags(recipient_data, render_to_string(:new_reply)), layout: false
  end

  # PATCH /surveys/1/create_reply
  def create_reply
    @survey = @reply.survey

    @reply.answers = reply_params[:replies][:answers]
    @reply.save

    redirect_to confirm_surveys_path
  end

  # POST /surveys
  def create
    @survey = Survey.new(survey_params)
    if @survey.save
      redirect_to edit_questions_survey_path(@survey), notice: 'Survey was successfully created.'
    else
      render :new 
    end
  end

  # PATCH/PUT /surveys/1
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

  # DELETE /surveys/1
  def destroy
    @survey.destroy
    respond_to do |surveyat|
      surveyat.html { redirect_to surveys_url, notice: 'Survey was successfully destroyed.' }
      surveyat.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_survey
      @survey = Survey.find(params[:id])
    end

    def set_reply
      @reply = Reply.find_by link_hash: params[:link_hash]
    end

    def reply_params
      params.require(:survey).permit!
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def survey_params
      params.require(:survey).permit(:name, :title, :users_data_file, :email_tag)
    end

    def survey_questions_params
      params.require(:survey).permit(items_attributes: [
        :id, :_destroy, :sequence, :actable_type, 
        { actable_attributes: 
          [
            :id, :_destroy, :title, :number, :description, :is_required, # Question Attributes
            :accepts_multiple, { alternatives_attributes: [:id, :_destroy, :value]}, # MultipleChoiceQuestion Attributes
            :content # Message Attributes
          ]
        }
      ])
    end
end
