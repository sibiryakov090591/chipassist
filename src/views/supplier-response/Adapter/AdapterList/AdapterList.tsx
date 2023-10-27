import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUploadedFiles } from "@src/store/adapter/adapterActions";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import useAppSelector from "@src/hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import useURLSearchParams from "@src/components/ProductCardNew/useURLSearchParams";
import { setUrlGetString } from "@src/utils/useCommonFilters";
import Preloader from "@src/components/Preloader/Preloader";
import useAppTheme from "@src/theme/useAppTheme";
import { clsx } from "clsx";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import { useStyles } from "./adapterListStyles";

const AdapterList: React.FC = () => {
  const dispatch = useDispatch<any>();
  const classes = useStyles();
  const appTheme = useAppTheme();
  const navigate = useNavigate();

  const page = +useURLSearchParams("page", false, 1);
  const page_size = +useURLSearchParams("page_size", false, 15);

  const isAuthenticated = useAppSelector((state) => state.auth.token !== null && !state.auth.loading);
  const partners = useAppSelector((state) => state.profile.profileInfo?.partners);
  const selectedPartner = useAppSelector((state) => state.profile.selectedPartner);
  const { items, itemsPagination, isItemsLoading } = useAppSelector((state) => state.adapter);

  useEffect(() => {
    if (selectedPartner && selectedPartner.id) {
      dispatch(getUploadedFiles({ seller: selectedPartner.id, page, page_size }));
    }
  }, [selectedPartner, page, page_size]);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    const correctNewPage = value + 1;
    if (selectedPartner && selectedPartner.id) {
      navigate(setUrlGetString({ seller: selectedPartner.id, page: correctNewPage, page_size } as any));
    }
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (selectedPartner && selectedPartner.id) {
      navigate(setUrlGetString({ seller: selectedPartner.id, page, page_size: value } as any));
    }
  };

  return (
    <div>
      {isAuthenticated && !partners?.length && (
        <Box p="60px 0" style={{ textAlign: "center", fontWeight: "bold" }}>
          You can&apos;t upload files as you are not a supplier
        </Box>
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className={clsx(appTheme.tableHeader, classes.tableHeaders)}>
              <TableCell>ID</TableCell>
              <TableCell>Partner</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Updated</TableCell>
              <TableCell>Errors</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isItemsLoading && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Box display="flex" justifyContent="center" p="20px">
                    <Preloader title={"Loading requests"} />
                  </Box>
                </TableCell>
              </TableRow>
            )}
            {!isItemsLoading && !items?.length && (
              <TableRow>
                <TableCell colSpan={4}>
                  <Box display="flex" justifyContent="center" p="20px">
                    No submitted files.
                  </Box>
                </TableCell>
              </TableRow>
            )}
            {!isItemsLoading &&
              !!items?.length &&
              items.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{item.id || "-"}</TableCell>
                    <TableCell>{item.partner_name || "-"}</TableCell>
                    <TableCell>{item.file || "-"}</TableCell>
                    <TableCell>{item.status || "-"}</TableCell>
                    <TableCell>
                      {item.updated
                        ? formatDistanceToNowStrict(new Date(item.updated), {
                            addSuffix: true,
                          })
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {item.errors?.length
                        ? item.errors.map((err) => {
                            return `Rows: ${err[0]}; Column: ${err[1]}; Error: ${err[2]};`;
                          })
                        : "-"}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {itemsPagination?.total_pages > 1 && (
          <TablePagination
            rowsPerPageOptions={[15, 25, 50]}
            component="div"
            count={itemsPagination.total_count}
            rowsPerPage={page_size}
            page={itemsPagination.page - 1}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </TableContainer>
    </div>
  );
};

export default AdapterList;
