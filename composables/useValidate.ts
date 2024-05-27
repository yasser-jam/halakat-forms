export default (value: string | string[], rules: string[] = ['required']): any[] => {
  let error: string = '';
  rules.forEach((rule) => {
    switch (rule) {
      case "required":
        if (!value) error = 'هذا الحقل مطلوب' 
    }
  });

  if (error.length) return [error];
  return [];
};
