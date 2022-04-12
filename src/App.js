import React, { useState } from 'react';
import CSVFileValidator from 'csv-file-validator';
import { Container } from './components/Container';
import { Modal } from './components/Modal';
import { Text } from './components/Text';
import { Button } from './components/Button';

const App = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [data, setData] = useState([]);
  const [errorFlag, setErrorFLag] = useState(false);
  const [noErrorFlag, setNoErrorFLag] = useState(false);

  const requiredError = (headerName, rowNumber, columnNumber) => {
    return `${headerName} is required in the ${rowNumber} row/ ${columnNumber} column`;
  };

  const validateError = (headerName, rowNumber, columnNumber) => {
    return `${headerName} is not valid in the ${rowNumber} row/ ${columnNumber} column`;
  };

  const uniqueError = (headerName, rowNumber) => {
    return `${headerName} is not unique at the ${rowNumber} row`;
  };

  const isEmailValid = function (email) {
    const reqExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    return reqExp.test(email);
  };

  const CSVConfig = {
    headers: [
      {
        name: 'First Name',
        inputName: 'firstName',
        required: true,
        requiredError,
      },
      {
        name: 'Last Name',
        inputName: 'lastName',
        required: true,
        requiredError,
        optional: true,
      },
      {
        name: 'Email',
        inputName: 'email',
        required: true,
        requiredError,
        unique: true,
        uniqueError,
        validate: isEmailValid,
        validateError,
      },
      {
        name: 'Roles',
        inputName: 'roles',
        required: true,
        requiredError,
        isArray: true,
      },
    ],
  };

  const onSelectCSVFile = async (file) => {
    setData([]);
    setNoErrorFLag(false);
    const csvData = await CSVFileValidator(file, CSVConfig);
    if (csvData.inValidMessages.length > 0) {
      console.log(csvData.inValidMessages);
      setValidationErrors(csvData.inValidMessages);
      setErrorFLag(true);
    } else {
      setNoErrorFLag(true);
      setData(csvData.data);
    }
  };

  const closeModal = () => {
    setValidationErrors([]);
    setErrorFLag(false);
  };

  return (
    <Container>
      {errorFlag && (
        <Modal>
          <Text color={'red'}>Errors: {validationErrors.length}</Text>

          {validationErrors.map((item) => (
            <Text color={'red'}>{item}</Text>
          ))}
          <Button onClick={() => closeModal()}> Close </Button>
        </Modal>
      )}
      <form>
        <input
          type='file'
          value={selectedFile}
          onChange={(e) => onSelectCSVFile(e.target.files[0])}
        />
      </form>
      {noErrorFlag && (
        <React.Fragment>
          <Text size={'20px'} color={'green'}>
            The csv file it's ok
          </Text>
          <Text size={'18px'}>Data:</Text>
          {data.map((item) => (
            <Text>
              {item.firstName} {item.lastName}, {item.email}, Roles:{' '}
              {JSON.stringify(item.roles)}
            </Text>
          ))}
        </React.Fragment>
      )}
    </Container>
  );
};

export default App;
