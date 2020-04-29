const Event = {
  error: '‼️',
  info: 'ℹ️',
  debug: '💬',
  verbose: '🔬',
  warning: '⚠️',
  severe: '🔥',
  action: '🏹',
};

function error(message) {
  log(message, Logger.event.error);
}

function log(message, event = Event.debug) {
  console.log(event, message);
}

function api(props: {
  request: {
    url: string,
    method: string,
    path: string,
    headers: any,
    parameters: any,
  },
  response: {
    status: number,
    data: any,
  },
}) {
  log(
    `${props.response.status} ${props.request.method} ${props.request.path}`,
    Logger.event.severe,
  );
  log({url: props.request.url}, Logger.event.verbose);
  log({headers: props.request.headers}, Logger.event.verbose);
  log({parameters: props.request.parameters}, Logger.event.verbose);
  log({responseData: props.response.data}, Logger.event.verbose);
}

const Logger = {
  event: Event,
  error,
  log,
  api,

  action(action, verbose) {
    Logger.log(action, Event.action);
    if (verbose) {
      Logger.log(verbose, Event.verbose);
    }
  },
};

export default Logger;
