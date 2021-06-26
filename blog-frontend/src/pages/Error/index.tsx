type ErrorProps = {
  statusCode: string,
}

const Error = ({ statusCode }: ErrorProps) => (
  <div className="container mx-auto w-full text-gray-200">
    <h1 className="pt-10 text-4xl mb-3">
      { ` Error ${statusCode}` }
    </h1>
    <p className="text-gray-300">Whatever you are looking for could not be found</p>
  </div>
);

export default Error;
