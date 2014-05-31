class TesterAnswersController < ApplicationController
  # GET /tester_answers
  # GET /tester_answers.json
  def index
    @tester_answers = current_user.tester_answers.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @tester_answers }
    end
  end

  # GET /tester_answers/1
  # GET /tester_answers/1.json
  def show
    @tester_answer = current_user.tester_answers.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @tester_answer }
    end
  end

  # GET /tester_answers/new
  # GET /tester_answers/new.json
  def new
    @tester_answer = current_user.tester_answers.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @tester_answer }
    end
  end

  # GET /tester_answers/1/edit
  def edit
    @tester_answer = current_user.tester_answers.find(params[:id])
  end

  # POST /tester_answers
  # POST /tester_answers.json
  def create
    @tester_answer = current_user.tester_answers.new(params[:tester_answer])

    respond_to do |format|
      if @tester_answer.save
        format.html { redirect_to @tester_answer, notice: 'Tester answer was successfully created.' }
        format.json { render json: @tester_answer, status: :created, location: @tester_answer }
      else
        format.html { render action: "new" }
        format.json { render json: @tester_answer.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /tester_answers/1
  # PUT /tester_answers/1.json
  def update
    @tester_answer = current_user.tester_answers.find(params[:id])

    @tester_answer.update_attributes(params[:tester_answer])
    redirect_to root_path

  end

  # DELETE /tester_answers/1
  # DELETE /tester_answers/1.json
  def destroy
    @tester_answer = current_user.tester_answers.find(params[:id])
    @tester_answer.destroy

    respond_to do |format|
      format.html { redirect_to tester_answers_url }
      format.json { head :no_content }
    end
  end
end
