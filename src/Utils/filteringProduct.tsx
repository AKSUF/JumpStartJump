const filteringProduct = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setItems: any,
    allItems: any
  ) => {
    console.log(allItems);
  
    if (e.target.value === "all") {
      setItems(allItems);
      return;
    }
  
    console.log(e.target.value);
    setItems(
      allItems.filter((item: any) => item.category === e.target.value)
    );
  };
  
  export default filteringProduct;
  