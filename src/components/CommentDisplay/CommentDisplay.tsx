import {
    Card,
    GridContainer,
    GridItem,
    Avatar,
    CardContent,
    Message,
    Accent,
} from "..";
import styled, { ThemeContext } from "styled-components";
import React, { FC, useState, useEffect, useContext } from "react";
import { Comment } from "../../api/dataApi";
import date from "../../utils/date-utils";
import pluralize from "pluralize";
import { useData } from "../../providers/DataProvider";

const StyledCommentCard = styled(Card)`
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: none;
    border-radius: ${({ theme }) => theme.borderRadius};
`;

interface CommentDisplayProps {
    comment: Comment;
}

const CommentDisplay: FC<CommentDisplayProps> = ({ comment }): JSX.Element => {
    const { message, creationDate, likes } = comment;
    let [fromNow, setFromNow] = useState(date.fromNow(creationDate));

    const themeContext = useContext(ThemeContext);

    const { users } = useData();
    const user = users.find(u => u.id === comment.userId);

    useEffect(() => {
        const interval = setInterval(
            () => setFromNow(date.fromNow(creationDate)),
            1000 * 60
        );

        return () => {
            clearInterval(interval);
        };
    }, [fromNow]);
    return (
        <GridContainer cols={["6rem", "auto"]} colGap="10px">
            {user && (
                <GridItem align="center" justify="center">
                    <Avatar src={user.avatar} size={6} />
                </GridItem>
            )}
            <GridItem>
                <StyledCommentCard>
                    <CardContent>
                        <GridContainer cols={["auto", "auto"]}>
                            {user && (
                                <>
                                    <GridItem>
                                        <div style={{ fontSize: "2rem" }}>
                                            {user.name}
                                        </div>
                                    </GridItem>
                                    <GridItem rowStart={2}>
                                        <Accent>{user.profession}</Accent>
                                    </GridItem>
                                </>
                            )}
                            <GridItem rowStart={1} colStart={2} justify="end">
                                <div
                                    style={{
                                        color: themeContext.colors.gray,
                                        fontSize: "1.2rem",
                                    }}
                                >
                                    {fromNow}
                                </div>
                            </GridItem>
                            <GridItem rowStart={3} colSpan={2}>
                                <Message>{message}</Message>
                            </GridItem>
                            <GridItem rowStart={4} align="end">
                                <div
                                    style={{ color: themeContext.colors.gray }}
                                >
                                    <span
                                        style={{
                                            color: likes
                                                ? "inherit"
                                                : themeContext.colors.grayLight,
                                        }}
                                    >
                                        {`${likes} ${pluralize("Like", likes)}`}
                                    </span>
                                </div>
                            </GridItem>
                        </GridContainer>
                    </CardContent>
                </StyledCommentCard>
            </GridItem>
        </GridContainer>
    );
};

export default CommentDisplay;
