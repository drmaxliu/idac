class TesterAnswersController < ApplicationController
  # GET /tester_answers
  # GET /tester_answers.json
  def index
    @tester_answers = TesterAnswer.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @tester_answers }
    end
  end

  # GET /tester_answers/1
  # GET /tester_answers/1.json
  def show
    @tester_answer = TesterAnswer.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @tester_answer }
    end
  end

  # GET /tester_answers/new
  # GET /tester_answers/new.json
  def new
    @tester_answer = TesterAnswer.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @tester_answer }
    end
  end

  # GET /tester_answers/1/edit
  def edit
    @tester_answer = TesterAnswer.find(params[:id])
  end

  # POST /tester_answers
  # POST /tester_answers.json
  def create
    @tester_answer = TesterAnswer.new(params[:tester_answer])

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
    @tester_answer = TesterAnswer.find(params[:id])

    respond_to do |format|
      if @tester_answer.update_attributes(params[:tester_answer])
        format.html { redirect_to @tester_answer, notice: 'Tester answer was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @tester_answer.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tester_answers/1
  # DELETE /tester_answers/1.json
  def destroy
    @tester_answer = TesterAnswer.find(params[:id])
    @tester_answer.destroy

    respond_to do |format|
      format.html { redirect_to tester_answers_url }
      format.json { head :no_content }
    end
  end
end
