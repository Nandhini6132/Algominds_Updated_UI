export const getStaticProps=async()=>{
    const response = await fetch("/api/getMethod", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
  
    return {
      props: {
        questions: result.data,
      },
    };
  }
  