import * as edgeworker from "../src/main.js";
import Request from 'request';
import Response from 'response';

const expectedCookie = {
  name: 'campaign',
  maxAge: 2592000,
  httpOnly: true
};
let requestMock, responseMock;

describe('onClientResponse / Set campaign cookie', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    requestMock = new Request();
    responseMock = new Response();
  });

  test("query + no referer", async () => {
    requestMock.query = 'campaign=ad001';
    let cookie = edgeworker.onClientResponse(requestMock, responseMock);

    expect(cookie.toHeader).toHaveBeenCalled();
    expect(responseMock.addHeader.mock.calls[0][0]).toBe('Set-Cookie');
    expect(cookie.name).toBe(expectedCookie.name);
    expect(cookie.maxAge).toBe(expectedCookie.maxAge);
    expect(cookie.httpOnly).toBe(expectedCookie.httpOnly);
    expect(cookie.value).toBe('ad001');
  });

  test("query + referer:google", async () => {
    requestMock.query = 'campaign=ad001';
    requestMock.getHeader.mockReturnValueOnce('https://www.google.com');
    let cookie = edgeworker.onClientResponse(requestMock, responseMock);

    expect(cookie.toHeader).toHaveBeenCalled();
    expect(responseMock.addHeader.mock.calls[0][0]).toBe('Set-Cookie');
    expect(cookie.name).toBe(expectedCookie.name);
    expect(cookie.maxAge).toBe(expectedCookie.maxAge);
    expect(cookie.httpOnly).toBe(expectedCookie.httpOnly);
    expect(cookie.value).toBe('ad001');
  });

  test("no query + referer:google", async () => {
    requestMock.getHeader.mockReturnValueOnce('https://www.google.com');
    let cookie = edgeworker.onClientResponse(requestMock, responseMock);

    expect(cookie.toHeader).toHaveBeenCalled();
    expect(responseMock.addHeader.mock.calls[0][0]).toBe('Set-Cookie');
    expect(cookie.name).toBe(expectedCookie.name);
    expect(cookie.maxAge).toBe(expectedCookie.maxAge);
    expect(cookie.httpOnly).toBe(expectedCookie.httpOnly);
    expect(cookie.value).toBe('se001');
  });

  test("no query + referer:yahoo", async () => {
    requestMock.getHeader.mockReturnValueOnce('https://www.yahoo.com');
    let cookie = edgeworker.onClientResponse(requestMock, responseMock);

    expect(cookie.toHeader).toHaveBeenCalled();
    expect(responseMock.addHeader.mock.calls[0][0]).toBe('Set-Cookie');
    expect(cookie.name).toBe(expectedCookie.name);
    expect(cookie.maxAge).toBe(expectedCookie.maxAge);
    expect(cookie.httpOnly).toBe(expectedCookie.httpOnly);
    expect(cookie.value).toBe('se002');
  });

  test("no query + referer:yahoo", async () => {
    requestMock.getHeader.mockReturnValueOnce('https://www.example.com');
    let cookie = edgeworker.onClientResponse(requestMock, responseMock);

    expect(cookie).toBeUndefined();
    expect(responseMock.addHeader).not.toHaveBeenCalled();
  });

  test("no query + no referer", async () => {
    let cookie = edgeworker.onClientResponse(requestMock, responseMock);

    expect(cookie).toBeUndefined();
    expect(responseMock.addHeader).not.toHaveBeenCalled();
  });
});
