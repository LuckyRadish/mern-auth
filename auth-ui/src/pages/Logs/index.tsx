import React, { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap-v5";
import { makeStyles } from "@material-ui/core";

import { useAlert } from "../../hooks";
import { requestLogs } from "../../axios";
import { timeFormat } from "../../helpers";
import SimpleTable from "../../components/SimpleTable";

export interface ILog {
  id: string;
  user: string;
  request: string;
  response: number;
  requestedAt: Date;
  respondedAt: Date;
}

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 56,
  },
  form: {
    width: 500,
  },
  jsonView: {
    width: 800,
    height: 400,
    border: "1px solid #ccc",
  },
}));

const Logs: React.FC = () => {
  const classes = useStyles();
  const { error: alertError } = useAlert();
  const [logs, setLogs] = useState<ILog[]>();

  const fetchLogs = useCallback(
    () => {
      requestLogs()
        .then(({ data }) => {
          setLogs(
            data.logs.map(({ _id, user, request, response, ...props }) => ({
              id: _id,
              user: user?.email || "",
              request: request.baseUrl,
              response: response.statusCode,
              ...props,
            }))
          );
        })
        .catch(alertError);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchLogs, []);

  return (
    <Container
      fluid
      className={`${classes.container} d-flex flex-column align-items-center`}
    >
      <h1 className="text-center">Request Logs</h1>
      <SimpleTable
        data={logs}
        headRows={[
          { id: "user", label: "User" },
          { id: "request", label: "Request" },
          { id: "response", label: "Response" },
          { id: "requestedAt", label: "Request Time", format: timeFormat },
          { id: "respondedAt", label: "Response Time", format: timeFormat },
        ]}
        primaryKey="id"
        defaultOrderBy="requestedAt"
      />
    </Container>
  );
};

export default Logs;
