import React from "react";

export const Members = ["Title", "Info", "Content"] as const;

export type StepMemberI = typeof Members[number];
export type StepStylesT = {
    [key in StepMemberI] : React.CSSProperties
} & {
    wrapper : React.CSSProperties
}
