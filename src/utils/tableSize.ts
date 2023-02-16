export const getColumnSize = (tableType: string | undefined, row: number) => {
    const threeColumns = ["45%", "45%", "10%"];
    let rowSize;
    if (tableType === "users") {
      rowSize = ["8%", "18%", "8%", "18%", "5%", "5%", "18%"];
      return rowSize[row];
    } else if (tableType === "medical") {
      rowSize = ["22%", "8%", "10%", "8%", "12%", "12%", "12%", "6%", "8%"];
      return rowSize[row];
    } else if (tableType === "firm") {
      rowSize = threeColumns;
      return rowSize[row];
    } else if (tableType === "patients") {
      rowSize = ["25%", "15%", "15%", "25%", "12%", "8%"];
      return rowSize[row];
    } else if (tableType === "admins") {
      rowSize = threeColumns;
      return rowSize[row];
    } else if (tableType === "clientusers") {
      rowSize = ["28%", "8%", "25%", "15%", "8%", "8%", "8%"];
      return rowSize[row];
    } else if (tableType === "medicalReports") {
      rowSize = ["25%", "25%", "25%", "25%"];
      return rowSize[row];
    }
    return "12%";
  };
  