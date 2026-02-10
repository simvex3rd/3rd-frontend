import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuizPanel } from "./QuizPanel";

const mockQuiz = {
  question: "What material is the crankshaft made of?",
  options: [
    { id: "a", text: "Aluminum" },
    { id: "b", text: "Steel" },
    { id: "c", text: "Plastic" },
    { id: "d", text: "Carbon Fiber" },
  ],
  correctAnswer: "b",
};

describe("QuizPanel", () => {
  it("should render quiz question", () => {
    render(<QuizPanel quiz={mockQuiz} />);
    expect(
      screen.getByText("What material is the crankshaft made of?")
    ).toBeInTheDocument();
  });

  it("should render all options", () => {
    render(<QuizPanel quiz={mockQuiz} />);
    expect(screen.getByText("Aluminum")).toBeInTheDocument();
    expect(screen.getByText("Steel")).toBeInTheDocument();
    expect(screen.getByText("Plastic")).toBeInTheDocument();
    expect(screen.getByText("Carbon Fiber")).toBeInTheDocument();
  });

  it("should render submit button", () => {
    render(<QuizPanel quiz={mockQuiz} />);
    expect(screen.getByText("제출")).toBeInTheDocument();
  });

  it("should have submit button disabled when no answer selected", () => {
    render(<QuizPanel quiz={mockQuiz} />);
    expect(screen.getByText("제출")).toBeDisabled();
  });

  it("should enable submit after selecting an answer", async () => {
    const user = userEvent.setup();
    render(<QuizPanel quiz={mockQuiz} />);

    await user.click(screen.getByLabelText("Steel"));
    expect(screen.getByText("제출")).toBeEnabled();
  });

  it("should show correct feedback on correct answer", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<QuizPanel quiz={mockQuiz} onComplete={onComplete} />);

    await user.click(screen.getByLabelText("Steel"));
    await user.click(screen.getByText("제출"));

    expect(screen.getByText(/정답입니다/)).toBeInTheDocument();
    expect(onComplete).toHaveBeenCalledWith(true);
  });

  it("should show incorrect feedback on wrong answer", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<QuizPanel quiz={mockQuiz} onComplete={onComplete} />);

    await user.click(screen.getByLabelText("Aluminum"));
    await user.click(screen.getByText("제출"));

    expect(screen.getByText(/오답입니다/)).toBeInTheDocument();
    expect(onComplete).toHaveBeenCalledWith(false);
  });

  it("should disable options after submission", async () => {
    const user = userEvent.setup();
    render(<QuizPanel quiz={mockQuiz} />);

    await user.click(screen.getByLabelText("Steel"));
    await user.click(screen.getByText("제출"));

    // All option buttons should be disabled
    const buttons = screen.getAllByRole("button");
    // Filter out the submit button (which is now replaced by feedback)
    const optionButtons = buttons.filter(
      (btn) => btn.getAttribute("aria-label") !== null
    );
    optionButtons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it("should not call onComplete if not provided", async () => {
    const user = userEvent.setup();
    render(<QuizPanel quiz={mockQuiz} />);

    await user.click(screen.getByLabelText("Steel"));
    await user.click(screen.getByText("제출"));

    // Should not throw
    expect(screen.getByText(/정답입니다/)).toBeInTheDocument();
  });

  it("should not submit without selection", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<QuizPanel quiz={mockQuiz} onComplete={onComplete} />);

    // Try clicking submit without selecting (it's disabled, but test the handler)
    const submitBtn = screen.getByText("제출");
    expect(submitBtn).toBeDisabled();
    expect(onComplete).not.toHaveBeenCalled();
  });
});
