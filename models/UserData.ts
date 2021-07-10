/*
 * \brief ������ � ������������ ������� 
 */
class UserData {
    public id:    number;  //!< ID ������������
    public login: string;  //!< ����� ������������
    public role:  string;  //!< ���� ������������ � �������
    public name:  string;  //!< ������ ��� ������������
}

/*
 * \brief ������ � ������������ �������, ���������� � ��������� ������
 */
interface StoredUserData {
    id:       number;  //!< ID ������������
    login:    string;  //!< ����� ������������
    password: string;  //!< ������������ �����
    name:     string;  //!< ������ ��� ������������
    role_id:  number;  //!< ���� ������������ � �������
}

export {
    StoredUserData,
    UserData
}