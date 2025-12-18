// export  const Endpoints = {

// }



const BASE_URL = "http://localinfoz.com:3200/api/";

export  class Endpoints {
    public static LOGIN = BASE_URL+"admin/login";
    public static CATEGORIES = BASE_URL+"student-categories";
    
    public static SUB_CATEGORIES = BASE_URL+"student-subcategories";
    
    public static SUBJECTS = BASE_URL+"subjects";

    
    public static CHAPTERS = BASE_URL+"chapters";


    public static QUESTIONS = BASE_URL+"questions";
}