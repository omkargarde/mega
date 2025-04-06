class ApiResponse {
  public message: string;
  public statusCode: number;
  public success: boolean;
  protected data: string;
  /**
   * Constructs an ApiResponse instance.
   *
   * @param statusCode - HTTP status code of the response.
   * @param data - The data to be included in the response.
   * @param message - Optional message providing additional information about the response. Defaults to "Success".
   */
  public constructor(
    statusCode: number,
    data: string,
    message: string = "Success",
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;

    this.success = statusCode < 400;
  }
}
export { ApiResponse };
