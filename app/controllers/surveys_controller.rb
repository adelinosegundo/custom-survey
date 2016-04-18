class SurveysController < ApplicationController
  include ApplicationHelper
  before_action :set_survey, only: [:show, :edit, :update, :destroy, :new_step, :edit_step, :create_reply]

  # GET /surveys
  # GET /surveys.json
  def index
    @surveys = Survey.all
  end

  # GET /surveys/1
  # GET /surveys/1.json
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
  
  # GET /surveys/new_reply
  def new_reply
    @reply = Reply.find(params[:reply_id])
    @survey = @reply.survey
    user = @reply.github_user
    render text: translate_tags(user, render_to_string(:new_reply)), layout: false
  end

  # GET /surveys/1/create_reply
  def create_reply
    # render :new_reply
    puts survey_params
    respond_to do |surveyat|
      if @survey.update(survey_params)
        surveyat.html { redirect_to @survey, notice: 'Survey was successfully updated.' }
        surveyat.json { render :show, status: :ok, location: @survey }
      else
        surveyat.html { render :new_reply }
        surveyat.json { render json: @survey.errors, status: :unprocessable_entity }
      end
    end
  end


  # POST /surveys
  # POST /surveys.json
  def create
    @survey = Survey.new(survey_params)
    respond_to do |surveyat|
      if @survey.save
        surveyat.html { redirect_to @survey, notice: 'Survey was successfully created.' }
        surveyat.json { render :show, status: :created, location: @survey }
      else
        surveyat.html { render :new }
        surveyat.json { render json: @survey.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /surveys/1
  # PATCH/PUT /surveys/1.json
  def update
    respond_to do |surveyat|
      if @survey.update(survey_params)
        surveyat.html { redirect_to @survey, notice: 'Survey was successfully updated.' }
        surveyat.json { render :show, status: :ok, location: @survey }
      else
        surveyat.html { render :edit }
        surveyat.json { render json: @survey.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /surveys/1
  # DELETE /surveys/1.json
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

    # Never trust parameters from the scary internet, only allow the white list through.
    def survey_params
      params.require(:survey).permit!
      # (:name, :title,
      #   items_attributes: [
      #     :id,
      #     :_destroy,
      #     :_type,
      #     :order,
          
      #     #message_attributes
      #     :text,

      #     #image_attributes
      #     :file,

      #     #question_attributes
      #     :number,
      #     :title,
      #     :description,
      #     :is_required,

      #     #multiple_choice_question_attributes
      #     :accepts_multiple,
      #     alternatives_attributes: [ :_id, :_destroy, :name, :value ]
      #   ]
      # )
    end
end
