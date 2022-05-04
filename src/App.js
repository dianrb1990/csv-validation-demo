import React, { useState } from 'react';
import CSVFileValidator from 'csv-file-validator';
import { Container } from './components/Container';
import { Modal } from './components/Modal';
import { Text } from './components/Text';
import { Button } from './components/Button';
import { Row } from './components/Row';
import { Input } from './components/Input';

const App = () => {
  const [selectedFile, setSelectedFile] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const [data, setData] = useState([]);
  const [errorFlag, setErrorFLag] = useState(false);
  const [noErrorFlag, setNoErrorFLag] = useState(false);
  const [openCreateTableModal, setOpenCreateTableModal] = useState(false);
  const [tableStructure, setTableStructure] = useState([]);
  const [tableName, setTableName] = useState('');
  const [tableFields, setTableFields] = useState({
    name: '',
    type: '',
    key: false,
  });
  const [table, setTable] = useState({
    AttributeDefinitions: [],
    KeySchema: [],
    TableName: '',
    ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
  });
  const [tableCreated, setTableCreated] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTableFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addFieldToStructure = () => {
    setTableStructure((prevState) => [...prevState, tableFields]);
    setTableFields({ name: '', type: '', key: false });
  };

  const createTable = () => {
    const structureKeys = tableStructure.filter((field) => field.key === true);
    const keySchema = [];
    const attributeDefinitions = [];
    structureKeys.forEach((field) => {
      keySchema.push({ AttributeName: field.name, KeyType: 'HASH' });
    });
    tableStructure.forEach((field) => {
      attributeDefinitions.push({
        AttributeName: field.name,
        AttributeType: field.type,
      });
    });
    setTable((prevState) => ({
      ...prevState,
      AttributeDefinitions: attributeDefinitions,
      KeySchema: keySchema,
      TableName: tableName,
    }));
    setOpenCreateTableModal(false);
    setTableStructure([]);
    setTableCreated(true);
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
      {noErrorFlag && (
        <React.Fragment>
          <Text size={'20px'} color={'green'}>
            The csv file it's ok
          </Text>
          <Text size={'18px'}>Data:</Text>
          {data.map((item) => (
            <Text>
              {item.firstName} {item.lastName}, {item.email}
            </Text>
          ))}
        </React.Fragment>
      )}
      {openCreateTableModal && (
        <Modal width={'90%'}>
          <Text color={'black'}>Create Table</Text>
          <Input
            width={'80%'}
            placeholder='Table Name'
            type='email'
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
          />
          <Row>
            <Input
              width={'20%'}
              placeholder='Field Name'
              type='text'
              value={tableFields.name}
              name={'name'}
              onChange={(e) => handleChange(e)}
            />
            <Input
              width={'20%'}
              placeholder='Field Type'
              type='text'
              value={tableFields.type}
              name={'type'}
              onChange={(e) => handleChange(e)}
            />
            <Row width={'20%'} margin={'0px 0px 0px 10px'}>
              <Text>Key</Text>
              <Input
                width={'10%'}
                type='checkbox'
                checked={tableFields.key}
                name={'key'}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: e.target.name,
                      value: e.target.checked,
                    },
                  })
                }
              />
            </Row>
            <Button onClick={() => addFieldToStructure()}> Add Field </Button>
          </Row>

          {tableStructure.length > 0 && (
            <Row width={'90%'} justifyContent={'space-evenly'}>
              <Text width={'33%'}> Field Name </Text>
              <Text width={'33%'}> Field Type </Text>
              <Text width={'33%'}>Is Key</Text>
            </Row>
          )}
          {tableStructure.map((item, index) => (
            <Row key={index} width={'90%'} justifyContent={'space-evenly'}>
              <Text width={'33%'}> {item.name} </Text>
              <Text width={'33%'}>{item.type} </Text>
              <Text width={'33%'}>{item.key && 'yes'}</Text>
            </Row>
          ))}

          <Row justifyContent={'center'}>
            <Button onClick={() => createTable()}> Create </Button>
            <Button onClick={() => setOpenCreateTableModal(false)}>
              {' '}
              Close{' '}
            </Button>
          </Row>
        </Modal>
      )}
      <form>
        <input
          type='file'
          value={selectedFile}
          onChange={(e) => onSelectCSVFile(e.target.files[0])}
        />
      </form>
      <Button onClick={() => setOpenCreateTableModal(true)}>
        {' '}
        Create Table{' '}
      </Button>
      {tableCreated && <Text>{JSON.stringify(table)}</Text>}
    </Container>
  );
};

export default App;
