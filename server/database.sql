CREATE TABLE book(    
    book_code SERIAL NOT NULL PRIMARY KEY,
    name_book VARCHAR(50) NOT NULL,
    author VARCHAR(50) NOT NULL,
    rack_number INTEGER
);


CREATE TABLE katalog(    
    book_code_branches SERIAL NOT NULL PRIMARY KEY,
    book_code INTEGER NOT NULL,
    department_code INTEGER NOT NULL,
    inventory_number INTEGER NOT NULL,
    rack_number INTEGER,
    FOREIGN KEY (book_code)  REFERENCES book (book_code),
    FOREIGN KEY (department_code)  REFERENCES branch (department_code)
);

CREATE TABLE branch(    
    department_code SERIAL NOT NULL PRIMARY KEY,
    department_name VARCHAR(50) NOT NULL,
    department_address VARCHAR(100) NOT NULL
);

CREATE TABLE issuing_books(    
    issue_code SERIAL NOT NULL PRIMARY KEY,
    subscriber_code INTEGER NOT NULL,
    book_code_branches INTEGER NOT NULL,
    pickup_date VARCHAR(50) NOT NULL,
    return_date VARCHAR(50) NOT NULL,
    FOREIGN KEY (subscriber_code)  REFERENCES subscriber (subscriber_code),
    FOREIGN KEY (book_code_branches)  REFERENCES katalog (book_code_branches)
);

CREATE TABLE subscriber(    
    subscriber_code SERIAL NOT NULL PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL,
    library_card INTEGER NOT NULL
);


SELECT public.branch.department_name, public.book.name_book 
FROM public.book join public.katalog ON public.book.book_code = public.katalog.book_code
join public.branch ON public.branch.department_code = public.katalog.department_code;

SELECT public.subscriber.full_name, public.book.name_book, public.issuing_books.pickup_date, public.issuing_books.return_date
FROM public.book join public.katalog ON public.book.book_code = public.katalog.book_code
join public.issuing_books ON public.katalog.book_code_branches = public.issuing_books.book_code_branches
join public.subscriber ON  public.subscriber.subscriber_code = public.issuing_books.subscriber_code;

SELECT public.subscriber.full_name, public.book.name_book, public.issuing_books.return_date
FROM public.book join public.katalog ON public.book.book_code = public.katalog.book_code
join public.issuing_books ON public.katalog.book_code_branches = public.issuing_books.book_code_branches
join public.subscriber ON  public.subscriber.subscriber_code = public.issuing_books.subscriber_code;