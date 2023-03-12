import { Button, Group, Stack, Container, Text, Title } from "@mantine/core"
import React, { useState } from "react"
import useMainStore from "../store/mainStore"
import { supabase } from "../utils/supabaseClient"

const Quiz = () => {
  const userId = useMainStore((state) => state.userId)
  const questions = [
    {
      questionText: "What is the capital of France?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionText: "Who is CEO of Tesla?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionText: "The iPhone was created by which company?",
      answerOptions: [
        { answerText: "Apple", isCorrect: true },
        { answerText: "Intel", isCorrect: false },
        { answerText: "Amazon", isCorrect: false },
        { answerText: "Microsoft", isCorrect: false },
      ],
    },
    {
      questionText: "How many Harry Potter books are there?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
  ]

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerOptionClick = async (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
      const { data, error } = await supabase
        .from("profiles")
        .select("quiz_scores")
        .eq("id", userId)

      let oldScore = data[0].quiz_scores

      if (oldScore !== null) {
        await supabase
          .from("profiles")
          .update({ quiz_scores: [...oldScore, score] })
          .eq("id", userId)
      } else {
        await supabase
          .from("profiles")
          .update({ quiz_scores: [score] })
          .eq("id", userId)
      }
    }
  }
  return (
    <Stack spacing="xl" align="center">
      <Title order={5}>General Knowledge Quiz</Title>
      <Group pos="relative" top="30vh">
        {showScore ? (
          <div className="score-section">
            You scored {score} out of {questions.length}
          </div>
        ) : (
          <Container>
            <Group>
              <Group align="flex-start" grow>
                <Text>
                  Question {currentQuestion + 1}/{questions.length}
                </Text>
              </Group>
              {questions[currentQuestion].questionText}
            </Group>
            <br />
            <br />
            <Group>
              {questions[currentQuestion].answerOptions.map((answerOption) => (
                <Button
                  onClick={() =>
                    handleAnswerOptionClick(answerOption.isCorrect)
                  }
                >
                  {answerOption.answerText}
                </Button>
              ))}
            </Group>
          </Container>
        )}
      </Group>
    </Stack>
  )
}

export default Quiz
