/*
 * \brief ������ � ���������
 */
class DocumentData {
    public id:             number;  //!< ID ���������
    public name:           string;  //!< �������� ��������� (�����������)
    public file_path:      string;  //!< ��� ����� (� �����������)
    public effective_date: Date;    //!< ���� ���������� ��������� � ����
}

export {
    DocumentData
}