import { composeStories } from "@storybook/testing-react";
import * as stories from "./ResourceType.stories";
import { userEvent } from "@storybook/testing-library";
import { render, waitForI18n } from "../../../test-utils";

const { WorksWithModal, InvalidSelection, ValidSelection } =
  composeStories(stories);

describe("Resource type", () => {
  it("should render a select component for resource type", async () => {
    const onChangeValue = jest.fn();
    const comp = render(<WorksWithModal onChangeValue={onChangeValue} />);

    await waitForI18n(comp);

    expect(await comp.findByText("Select type")).toBeInTheDocument();
    expect(await comp.findByText("Consumer group")).toBeInTheDocument();
    expect(await comp.findByText("Topic")).toBeInTheDocument();
    expect(await comp.findByText("Kafka instance")).toBeInTheDocument();
    expect(await comp.findByText("Transactional ID")).toBeInTheDocument();
    userEvent.click(await comp.findByText("Transactional ID"));
    expect(await comp.findByText("Select type")).toBeInTheDocument();
    expect(await comp.queryByText("Topic")).not.toBeInTheDocument();
    expect(await comp.queryByText("Kafka instance")).not.toBeInTheDocument();
    expect(await comp.queryByText("Transactional ID")).not.toBeInTheDocument();
    expect(await comp.queryByText("Consumer group")).not.toBeInTheDocument();
  });
  it("should show a select component for resource type with validation error ", async () => {
    const onChangeValue = jest.fn();
    const comp = render(<InvalidSelection onChangeValue={onChangeValue} />);
    await waitForI18n(comp);
    expect(await comp.findByText("Select type")).toBeInTheDocument();
    expect(await comp.findByText("Required")).toBeInTheDocument();
    userEvent.click(await comp.findByText("Select type"));
    expect(await comp.findByText("Topic")).toBeInTheDocument();
    expect(await comp.findByText("Kafka instance")).toBeInTheDocument();
    expect(await comp.findByText("Transactional ID")).toBeInTheDocument();
    userEvent.click(await comp.findByText("Transactional ID"));
    expect(await comp.findByText("Select type")).toBeInTheDocument();
    expect(await comp.queryByText("Transactional ID")).not.toBeInTheDocument();
    expect(await comp.queryByText("Topic")).not.toBeInTheDocument();
    expect(await comp.queryByText("Kafka instance")).not.toBeInTheDocument();
    expect(await comp.queryByText("Consumer group")).not.toBeInTheDocument();
  });

  it("should show a select component for resource type with a valid value selected ", async () => {
    const onChangeValue = jest.fn();
    const comp = render(<ValidSelection onChangeValue={onChangeValue} />);
    await waitForI18n(comp);
    expect(await comp.findByText("Topic")).toBeInTheDocument();
    expect(await comp.queryByText("Select type")).not.toBeInTheDocument();
    userEvent.click(await comp.findByText("Topic"));
    expect(await comp.findByText("Kafka instance")).toBeInTheDocument();
    expect(await comp.findByText("Transactional ID")).toBeInTheDocument();
    expect(await comp.findByText("Consumer group")).toBeInTheDocument();
    const topicValue = await comp.getAllByText("Topic");
    expect(topicValue[0]).toBeInTheDocument();
    expect(topicValue[1]).toBeInTheDocument();
  });
});
