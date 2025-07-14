"use client"

import styles from "./(styles)/ProductsPage.module.css"
import buttonStyles from "../../../AdditionalStyles/ButtonStyles/ButtonStyles.module.css"
import blockStyles from "../../styles/AdditionalStyles/BlockStyles/BlockStyles.module.css"
import parallaxStyles from "../../styles/AdditionalStyles/ParallaxStyles/ParallaxStyles.module.css"
import ParallaxContainer from "../../components/ParallaxSection"
import SingleProductCard from "../../components/SingleProductCard/SingleProductCard"
import Reviews from "../../components/Reviews/Reviews"
import { useRouter, useSearchParams } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"


import React, {
  useRef,
  useState,
  useEffect,
  FormEvent,
  MouseEvent,
  RefObject,
} from "react";


interface Product {
  id: number | string;
  name: string;
  category: string;
  price: number;
  rating: number;
  for?: string;
  imageSrc: string;
}

export default function ProductsPage() {
  const productCardsDivRef = useRef<HTMLDivElement>(null)
  const productButtonShowRef = useRef<HTMLButtonElement>(null)
  const productCardRef = useRef<HTMLDivElement>(null)
  const [isHidden, setIsHidden] = useState(true)

  const products = useSelector((state: any) => state.productsSlice.products) as Product[]

  const searchFormRef = useRef<HTMLFormElement>(null);
  const [isPageScrolled, setIsPageScrolled] = useState(false);
  const [isRemoveSearchForm, setIsRemoveSearchForm] = useState(false);

  // Next.js useSearchParams дає об'єкт URLSearchParams, але setSearchParams тут - треба робити інакше
  const searchParams = useSearchParams()
  const router = useRouter()

  const [searchByNameInput, setSearchByNameInput] = useState<string>("")
  const [searchByCategoryState, setSearchByCategoryState] = useState<string>("")

  const searchByName = searchParams.get("name") ?? ""
  const searchByCategory = searchParams.get("category") ?? ""
  const searchByFilter = searchParams.get("filter") ?? ""

  const updateSearchParams = (params: Record<string, string | null>) => {
    const currentParams = new URLSearchParams(Array.from(searchParams.entries()))

    Object.entries(params).forEach(([key, value]) => {
      if (value === null) currentParams.delete(key)
      else currentParams.set(key, value)
    })

    window.location.href = `${window.location.pathname}?${currentParams.toString()}`
  } 

  useEffect(() => {
    setSearchByNameInput(searchByName)
  }, [searchByName])


  // Обробник форми пошуку
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchByNameInput.trim().length === 0) {
      updateSearchParams({ name: null });
    } else {
      updateSearchParams({ name: searchByNameInput });
    }
  };

  // Обробники для фільтрів і категорій
  const handleChangeFilter = (option: string) => {
    if (option === "no-filter") {
      updateSearchParams({ filter: null, name: searchByNameInput || null });
    } else {
      updateSearchParams({ filter: option, name: searchByNameInput || null });
    }
  };

  const handleChangeCategory = (option: string) => {
    if (option === "no-category") {
      updateSearchParams({ category: null, name: searchByNameInput || null });
      setSearchByCategoryState("");
    } else {
      updateSearchParams({ category: option, name: searchByNameInput || null });
      // Зберігаємо стан, відмінний від ключа у URL, бо в оригіналі було categoryOptions.name (людський текст)
      setSearchByCategoryState(option);
    }
  };

  // Фільтровані продукти
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Спочатку фільтрація по імені
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchByName.toLowerCase())
    );

    // Фільтрація по категорії
    if (searchByCategory.length !== 0) {
      if (searchByCategoryState === "For Dogs" || searchByCategory === "dogs") {
        filtered = filtered.filter((product) => product.for === "dogs");
      } else if (searchByCategoryState === "For Cats" || searchByCategory === "for-cats") {
        filtered = filtered.filter((product) => product.for === "cats");
      } else {
        filtered = filtered.filter(
          (product) =>
            product.category.toLowerCase() ===
            (searchByCategoryState || searchByCategory).toLowerCase()
        );
      }
    }

    // Фільтрація по фільтру
    if (searchByFilter.length !== 0) {
      switch (searchByFilter) {
        case "price-desc":
          filtered = [...filtered].sort((a, b) => b.price - a.price);
          break;
        case "price-asc":
          filtered = [...filtered].sort((a, b) => a.price - b.price);
          break;
        case "rating":
          filtered = [...filtered].sort((a, b) => b.rating - a.rating);
          break;
      }
    }

    setFilteredProducts(filtered);
  }, [products, searchByName, searchByCategory, searchByFilter, searchByCategoryState]);

  // Обробка скролу
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        if (!searchFormRef.current || !productCardsDivRef.current) return;

        setIsPageScrolled(searchFormRef.current.getBoundingClientRect().top < 150);
        setIsRemoveSearchForm(
          document.documentElement.scrollTop >
            productCardsDivRef.current.clientHeight + 200
        );
      });
    };

    document.body.addEventListener("scroll", handleScroll);
    return () => document.body.removeEventListener("scroll", handleScroll);
  }, []);

  // refs для селектів і стрілок
  const selectFilterBoxRef = useRef<HTMLDivElement>(null)
  const filterOptionsListRef = useRef<HTMLUListElement>(null)
  const selectedFilterRef = useRef<HTMLSpanElement>(null)
  const filterArrowRef = useRef<HTMLElement>(null)

  const selectCategoryBoxRef = useRef<HTMLDivElement>(null)
  const categoryOptionsListRef = useRef<HTMLUListElement>(null)
  const selectedCategoryRef = useRef<HTMLSpanElement>(null)
  const categoryArrowRef = useRef<HTMLElement>(null)

  const handleClickNotSelectMenu: any = (event: MouseEvent) => {
  if (
    selectFilterBoxRef.current &&
    !selectFilterBoxRef.current.contains(event.target as Node)
  ) {
    filterOptionsListRef.current?.classList.remove(styles["show"])
    selectFilterBoxRef.current.classList.remove(styles["select-box--active"])
    filterArrowRef.current?.classList.remove(styles["arrow--active"])
  }
  if (
    selectCategoryBoxRef.current &&
    !selectCategoryBoxRef.current.contains(event.target as Node)
  ) {
    categoryOptionsListRef.current?.classList.remove(styles["show"])
    selectCategoryBoxRef.current.classList.remove(styles["select-box--active"])
    categoryArrowRef.current?.classList.remove(styles["arrow--active"])
  }
}

useEffect(() => {
  document.addEventListener("click", handleClickNotSelectMenu)
  return () => document.removeEventListener("click", handleClickNotSelectMenu)
}, [])


  const filterOptions = [
    { id: 1, name: "No Filter", option: "no-filter" },
    { id: 2, name: "Price (High to Low)", option: "price-desc" },
    { id: 3, name: "Price (Low to High)", option: "price-asc" },
    { id: 4, name: "Rating", option: "rating" },
  ]

  const categoryOptions = [
    { id: 1, name: "No Category", option: "no-category" },
    { id: 2, name: "Toys", option: "toys" },
    { id: 3, name: "Furniture", option: "furniture" },
    { id: 4, name: "Food & Treats", option: "food-&-treats" },
    { id: 5, name: "For Dogs", option: "dogs" },
    { id: 6, name: "For Cats", option: "cats" },
  ]

  return (
    <section className={styles["products"]}>
      <ParallaxContainer additionalStyles=""
        className={`${parallaxStyles["parallax-item"]} ${parallaxStyles["parallax-item--top"]}`}
      >
        <div className={styles["products__container"]}>
          <div
            className={`${styles["products__block-header"]} ${blockStyles["block-header"]} ${blockStyles["block-header--center"]}`}
          >
            <div className={blockStyles["block-header__label"]}>Our products</div>
            <h2 className={blockStyles["block-header__title"]}>For all your pet needs</h2>
            <div className={blockStyles["block-header__text"]}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquam mi
                id augue ultrices, in tempus elit.
              </p>
            </div>
          </div>
          <form
            className={`${styles["search-form"]} 
            ${filteredProducts.length > 0 && isPageScrolled ? styles["search-form--scroll"] : ""} 
            ${filteredProducts.length > 0 && isRemoveSearchForm ? styles["search-form--scroll-remove"]: ""}`}
            onSubmit={handleSubmit}
            ref={searchFormRef}
          >
            <div className={styles["input__wrapper"]}>
              <input
                className={styles["input"]}
                placeholder="Search..."
                type="text"
                value={searchByNameInput}
                onChange={(e) => setSearchByNameInput(e.target.value)}
              />
              <div
                style={{
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                  opacity: searchByNameInput.length > 0 ? 1 : 0,
                  transform: `scale(${searchByNameInput.length > 0 ? 1 : 0})`,
                }}
                className={styles["input-clear"]}
                onClick={() => {
                  setSearchByNameInput("");
                  updateSearchParams({ name: null });
                }}
              >
                <span></span>
                <span></span>
              </div>
            </div>
            <div className={`${styles["select-container"]} ${styles["select--category-container"]}`}>
              <span className={styles["select-title"]}>Category: </span>
              <div className={styles["select-wrapper"]}>
                <div
                  className={styles["select-box"]}
                  ref={selectCategoryBoxRef}
                  onClick={() => {
                    categoryOptionsListRef.current?.classList.toggle(styles["show"]);
                    categoryArrowRef.current?.classList.toggle(styles["arrow--active"]);
                    selectCategoryBoxRef.current?.classList.toggle(styles["select-box--active"]);
                  }}
                >
                  <span
                    className={`${styles["selected-item"]} ${
                      searchByCategory === "" ? styles["selected-item--empty"] : ""
                    }`}
                    ref={selectedCategoryRef}
                  >
                    {categoryOptions.find((c) => c.option === searchByCategory)?.name ||
                      categoryOptions[0].name}
                  </span>
                  <i className={styles["arrow"]} ref={categoryArrowRef} />
                </div>
                <ul className={styles["options-list"]} ref={categoryOptionsListRef}>
                  {categoryOptions.map((category, index) => (
                    <li
                      key={category.id}
                      style={{
                        display: index === 0 && selectedCategoryRef.current?.textContent === categoryOptions[0].name ? "none" : "block",
                      }}
                      className={styles["option-item"]}
                      onClick={(e) => {
                        const allOptionItems =
                          (e.currentTarget.parentNode as HTMLElement).querySelectorAll("li")
                        allOptionItems.forEach((item) =>
                          item.classList.remove(styles["selected"])
                        )

                        handleChangeCategory(category.option)

                        if (selectedCategoryRef.current) {
                          selectedCategoryRef.current.textContent = category.name;
                          if (category.option === "no-category") {
                            selectedCategoryRef.current.classList.add(
                              styles["selected-item--empty"]
                            )
                          } else {
                            selectedCategoryRef.current.classList.remove(
                              styles["selected-item--empty"]
                            );
                            (e.currentTarget as HTMLElement).classList.add(styles["selected"])
                          }
                        }

                        categoryOptionsListRef.current?.classList.remove(styles["show"])
                      }}
                    >
                      {category.name} {category.name !== "For Cats" && category.name !== "For Dogs" && categoryOptions[index].name !== categoryOptions[0].name && <span style={{opacity: 0.4}}>
                        {`(${products.filter(product =>  product.name.toLocaleLowerCase().includes(searchByNameInput.toLocaleLowerCase()))
                            .filter(product => category.name === product.category)
                            .length})`}
                        </span>} 
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Фільтри */}
            <div className={`${styles["select-container"]} ${styles["select--filter-container"]}`}>
              <span className={styles["select-title"]}>Filter by: </span>
              <div className={styles["select-wrapper"]}>
                <div
                  className={styles["select-box"]}
                  ref={selectFilterBoxRef}
                  onClick={() => {
                    filterOptionsListRef.current?.classList.toggle(styles["show"]);
                    filterArrowRef.current?.classList.toggle(styles["arrow--active"]);
                    selectFilterBoxRef.current?.classList.toggle(styles["select-box--active"]);
                  }}
                >
                  <span
                    className={`${styles["selected-item"]} ${
                      searchByFilter === "" ? styles["selected-item--empty"] : ""
                    }`}
                    ref={selectedFilterRef}
                  >
                    {filterOptions.find((f) => f.option === searchByFilter)?.name ||
                      filterOptions[0].name}
                  </span>
                  <i className={styles["arrow"]} ref={filterArrowRef} />
                </div>
                <ul className={styles["options-list"]} ref={filterOptionsListRef}>
                  {filterOptions.map((filter, index) => (
                    <li
                      key={filter.id}
                      style={{
                        display:
                          index === 0 &&
                          selectedFilterRef.current?.textContent === filterOptions[0].name
                            ? "none"
                            : "block",
                      }}
                      className={styles["option-item"]}
                      onClick={(e) => {
                        const allOptionItems =
                          (e.currentTarget.parentNode as HTMLElement).querySelectorAll("li");
                        allOptionItems.forEach((item) =>
                          item.classList.remove(styles["selected"])
                        );

                        handleChangeFilter(filter.option);

                        if (selectedFilterRef.current) {
                          selectedFilterRef.current.textContent = filter.name;
                          if (filter.option === "no-filter") {
                            selectedFilterRef.current.classList.add(
                              styles["selected-item--empty"]
                            );
                          } else {
                            selectedFilterRef.current.classList.remove(
                              styles["selected-item--empty"]
                            );
                            (e.currentTarget as HTMLElement).classList.add(styles["selected"]);
                          }
                        }

                        filterOptionsListRef.current?.classList.remove(styles["show"]);
                      }}
                    >
                      {filter.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button type="submit" className={styles["button"]}>
              Search
            </button>
          </form>

          <div className={styles["products__items"]} ref={productCardsDivRef}>
          {
            filteredProducts.map(product => {
              return (
                <SingleProductCard
                  // style={{zIndex: 2}}
                  // ref={productCardRef}
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  price={product.price}
                  rating={product.rating}
                  imageSrc={product.imageSrc}
                  isHide={false}
                />)
              })
          }
          </div>
          {
            filteredProducts.length === 0 ? 
            <>
                <img className={styles["dog-image"]} src="/images/products/sad-dog.jpg" alt="Sad dog" />
                <p className={styles["text__no-items"]}>
                    We couldn't find any items matching your search.
                    Even our pup looks a bit sad 😢
                </p>
            </>
            :
            <></>
            // <button className={`${styles["products__button"]} ${buttonStyles["button"]} ${buttonStyles["button--withBg"]}`} 
            //     ref={productButtonShowRef}
            //     onClick={handleProductButtonClick}
            // >
            //     <span>Show more</span>
            // </button>
          }
        </div>
      </ParallaxContainer>
      <Reviews />
    </section>
  );
}
