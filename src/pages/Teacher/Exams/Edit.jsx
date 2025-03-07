import { useLoaderData, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@components/Card';

import Swal from 'sweetalert2';
import { editExam, postExam } from '@services/teacher';
import { useExam } from '@hooks/useExam';
import ExamGeneratedList from '@components/ExamGeneratedList';

export const loader = ({ params }) => {
  return { id: params.id, examID: params.idExam }
}

const EditExam = () => {

  const { id, examID } = useLoaderData()
  const navigate = useNavigate()
  const { exam, setExam, examConfig, setExamConfig, handleDeleteExam } = useExam({ id, examID })

  const editAnswerHandle = async (answerIndex, examIndex) => {
    const answerText = exam[examIndex].answers[answerIndex]
    const { value: answer } = await Swal.fire({
      title: "Answer",
      input: "text",
      inputValue: answerText,
      inputLabel: "Your Answer",
      inputPlaceholder: "Enter your Answer",

    });
    if (answer) {
      Swal.fire(`Entered answer: ${answer}`);
      const newExam = [...exam]
      newExam[examIndex].answers[answerIndex] = answer
      setExam(newExam)
    }
  }

  const editAskHandle = async (examIndex) => {
    const askText = exam[examIndex].ask
    const { value: askValue } = await Swal.fire({
      title: "ASK",
      input: "text",
      inputValue: askText,
      inputLabel: "Your ASK",
      inputPlaceholder: "Enter your ASK",

    });
    if (askValue) {
      const newExam = [...exam]
      newExam[examIndex].ask = askValue
      setExam(newExam)
    }
  }

  const removeAnswerHandle = (examIndex, answerIndex) => {
    const newExam = [...exam]
    const newAnswers = newExam[examIndex].answers.filter((_, index) => index !== answerIndex)
    newExam[examIndex].answers = newAnswers
    setExam(newExam)
  }

  const editCorrectAnswerHandle = async (examIndex, answerIndex) => {
    const newExam = [...exam]
    newExam[examIndex].correct = answerIndex
    setExam(newExam)
  }

  const editPointsHandle = (examIndex, type) => {

    let currentVal = exam[examIndex].points

    if (type === "add") {
      currentVal++
    }

    if (type === "remove" && currentVal > 0) {
      currentVal--
    }

    const newExam = [...exam]
    newExam[examIndex].points = currentVal
    setExam(newExam)
  }

  const updateTitleHandle = (e) => {
    const value = e.target.value

    setExamConfig({
      title: value,
      prompt: examConfig.prompt
    })
  }

  //update exam
  const saveHandle = () => {
    const data = {
      "exam": exam,
      "config": examConfig,
      "roomID": id,
      "id": examID
    }

    Swal.fire({
      title: "Guardar Cambios?",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Guardar"
    }).then(async (result) => {
      if (result.isConfirmed) {

        await editExam(data).then(result => console.log(result)).catch((e) => console.log(e))


        navigate(`/Teacher/Rooms/${id}`)
      }
    })
  }


  const publicExamHandle = () => {
    const data = {
      "id": examID
    }

    Swal.fire({
      title: "Publicar",
      showCancelButton: true,
      cancelButtonColor: "red",
      confirmButtonText: "Publicar",
      text: "Una vez PUBLICADO ya no podrá editarse"
    }).then(async (result) => {
      if (result.isConfirmed) {

        await postExam(data).then(result => console.log(result)).catch((e) => console.log(e))


        navigate(`/Teacher/Rooms/${id}`)
      }
    })
  }

  return (
    <>
      {
        exam && <div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Card>
              <CardHeader>
                <CardTitle>Editar Examen</CardTitle>
                <button onClick={publicExamHandle} className='bg-green-500 px-6 py-2 rounded font-medium'>Publicar</button>
              </CardHeader>

              <CardContent>
                <form>
                  <div className='flex flex-col gap-4 '>
                    <div>
                      <label htmlFor="">Titulo</label>
                      <input name='title' type='text' className='w-full h-10 text-black p-2' placeholder='titulo' defaultValue={examConfig.title} onChange={updateTitleHandle} />
                    </div>
                    <input type="hidden" name='level' />

                  </div>
                </form>
              </CardContent>
            </Card>

            <div className='bg-slate-800 flex flex-col'>
              <CardHeader>
                <CardTitle>Total de Puntos</CardTitle>
              </CardHeader>
              <div className=' h-full flex items-center justify-center'>
                <p className='text-6xl m-4'>
                  {exam.reduce((accumulator, currentValue) => accumulator + currentValue.points, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2 mt-4'>
            <ExamGeneratedList
              handleDeleteExam={handleDeleteExam}
              editAnswerHandle={editAnswerHandle}
              editAskHandle={editAskHandle}
              removeAnswerHandle={removeAnswerHandle}
              editCorrectAnswerHandle={editCorrectAnswerHandle}
              editPointsHandle={editPointsHandle}
              saveHandle={saveHandle}
              examList={exam}
            />
          </div>
        </div>
      }
    </>
  );
}

export default EditExam;
