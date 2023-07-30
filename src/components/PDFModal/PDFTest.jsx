import { format } from "date-fns";

import { isMobile } from "react-device-detect";

import {
  Document,
  Font,
  PDFDownloadLink,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import { formatProfName, formatTimeslot } from "../../utils";
import { useTheme } from "@mui/material";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: "16px 0",
  },

  ticket: {
    // border: "2px solid black",
    width: "80mm",
    fontFamily: "Open Sans",
    fontSize: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    padding: "4px 8px",
  },

  ticketHeader: {
    width: "100%",
    textAlign: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
  },

  subtitle: {
    fontWeight: "bold",
  },

  assignmentContainer: {
    borderTop: "1px solid black",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
  },

  assignmentTitle: {
    fontSize: 12,
  },

  requests: {
    fontSize: 12,
    fontWeight: "bold",
    margin: "8px 0",
  },

  request: {
    width: "100%",
    marginBottom: "8px",
  },

  requestHeader: {
    padding: "4px 0",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },

  group: {
    borderTop: "1px dotted black",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    width: "100%",
    marginBottom: "4px",
  },

  groupTitle: {
    fontWeight: "bold",
  },

  groupContent: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
  },

  groupLabel: {
    fontWeight: "bold",
  },

  groupData: {
    fontWeight: "normal",
    textAlign: "left",
  },

  subsection: {
    marginTop: "4px",
    borderTop: "1px solid black",
  },

  subsectionHeader: {
    fontSize: 12,
    textAlign: "center",
  },

  itemsContent: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },

  itemsContentHeader: {
    borderBottom: "1px solid black",
    fontWeight: "bold",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  itemsContentItem: {
    borderBottom: "1px dotted black",
    flexDirection: "row",
    fontWeight: "normal",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  wasteContentItem: {
    borderBottom: "1px dotted black",
    flexDirection: "column",
    fontWeight: "normal",
    alignItems: "flex-start",
    width: "100%",
  },

  itemName: {
    maxWidth: "70%",
    textAlign: "left",
  },

  itemQuantity: {
    maxWidth: "25%",
    textAlign: "right",
  },

  extras: {
    marginTop: "4px",
    width: "100%",
    textAlign: "left",
    fontWeight: "bold",
  },

  extrasItem: {
    borderBottom: "1px dotted black",
  },

  wasteLabel: {
    fontWeight: "bold",
    textAlign: "left",
  },

  wasteData: {
    fontWeight: "normal",
    textAlign: "left",
  },

  footer: {
    margin: "8px 0 4px",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export const PDFTest = ({ requests = {}, requestsDate = new Date() }) => {
  const theme = useTheme();
  const formattedReqsDate = format(requestsDate, "dd/LL/yyyy");

  const ticketDoc = (
    <Document
      title={`SISLAB Solicitudes - ${formattedReqsDate}`}
      author="SISLAB"
      language="es"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.ticket}>
          <TicketHeader />
          <Text>{`${format(
            new Date(),
            "dd/LL/yyyy HH:mm"
          )} - Solicitudes ${formattedReqsDate}`}</Text>
          {Object.values(requests).map((assignment) => (
            <Assignment
              key={assignment.assignment._id}
              assignment={assignment}
            />
          ))}
          <View style={styles.footer}>
            <Text>sislab.vercel.app</Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  if (isMobile) {
    return (
      <PDFDownloadLink
        document={ticketDoc}
        fileName={`SISLAB Solicitudes - ${formattedReqsDate}`}
        style={{
          color: "white",
          padding: "8px 16px",
          background: theme.palette.primary.main,
          borderRadius: "8px",
        }}
      >
        Descargar PDF
      </PDFDownloadLink>
    );
  }

  return (
    <PDFViewer
      width="95%"
      height="95%"
      showToolbar={true}
      style={{ borderRadius: "8px" }}
    >
      {ticketDoc}
    </PDFViewer>
  );
};

const TicketHeader = () => {
  return (
    <View style={styles.ticketHeader}>
      <Text style={styles.title}>SISLAB</Text>
      <Text style={styles.subtitle}>
        Sistema de Solicitudes para Laboratorios
      </Text>
    </View>
  );
};

const Assignment = ({ assignment }) => {
  const { assignment: assignmentItem, professors } = assignment;

  return (
    <View style={styles.assignmentContainer}>
      <Text
        style={styles.assignmentTitle}
      >{`Práctica ${assignmentItem.number}`}</Text>
      <Text>{assignmentItem.name}</Text>
      <Text style={styles.requests}>Solicitudes</Text>
      {Object.values(professors).map((prof, index) => (
        <Request key={prof.professor._id} professor={prof} index={index} />
      ))}
      <Reagents reagents={assignmentItem.reagents} professors={professors} />
      <Equipment equipment={assignmentItem.equipment} professors={professors} />
      <Waste waste={assignmentItem.waste} professors={professors} />
    </View>
  );
};

const Request = ({ index, professor }) => {
  const { professor: professorItem, requests } = professor;

  return (
    <View style={styles.request}>
      <View style={styles.requestHeader}>
        <Text>{`Solicitud ${index + 1}`}</Text>
        <Text>{`Profesor: ${formatProfName(
          professorItem.name,
          professorItem.surname
        )}`}</Text>
      </View>
      {requests.map((request, index) => (
        <Group key={request._id} group={request} index={index} />
      ))}
    </View>
  );
};

const Group = ({ group, index }) => {
  const { groupId: groupItem } = group;

  return (
    <View style={styles.group}>
      <Text style={styles.groupTitle}>{`Grupo ${index + 1}`}</Text>
      <View style={styles.groupContent}>
        <Text style={styles.groupLabel}>
          # de equipos: <Text style={styles.groupData}>{groupItem.teams}</Text>
        </Text>
        <Text style={styles.groupLabel}>
          Fecha:{" "}
          <Text style={styles.groupData}>{`${format(
            new Date(group.requestDate),
            "dd/LL/yyyy"
          )} ${formatTimeslot(groupItem.time)}`}</Text>
        </Text>
        <Text style={styles.groupLabel}>
          Laboratorio: <Text style={styles.groupData}>{groupItem.lab}</Text>
        </Text>
        {group.customReagents.length > 0 && (
          <Text style={styles.groupLabel}>
            Extras:{" "}
            <Text style={styles.groupData}>
              {group.customReagents
                .map(
                  (reagent) =>
                    `${reagent.quantity}${reagent.unit} de ${reagent.reagent}`
                )
                .join(", ")}
            </Text>
          </Text>
        )}
      </View>
    </View>
  );
};

const Reagents = ({ reagents, professors = [] }) => {
  const { groups: reagentGroups } = reagents;

  const shouldRenderExtras = Object.values(professors).some((prof) =>
    prof.requests.some((request) => request.customReagents.length > 0)
  );

  return (
    <View style={styles.subsection}>
      <Text style={styles.subsectionHeader}>Reactivos</Text>
      {reagentGroups.length < 1 ? (
        <Text>Esta práctica no requiere reactivos</Text>
      ) : (
        <View style={styles.itemsContent}>
          {reagentGroups.map((group) => (
            <>
              <View style={styles.itemsContentHeader}>
                <Text>Nombre</Text>
                <Text>Cantidad</Text>
              </View>
              {group.reagents.map((reagent, index) => (
                <View
                  key={`Reagent ${index}: ${reagent.reagent}`}
                  style={styles.itemsContentItem}
                >
                  <Text style={styles.itemName}>{reagent.reagent}</Text>
                  <Text style={styles.itemQuantity}>{`${
                    reagent.quantity || "--"
                  }${reagent.unit || "--"}`}</Text>
                </View>
              ))}
            </>
          ))}
        </View>
      )}
      <View style={styles.extras}>
        {/* <Text>Nota: verificar solo rellenado</Text> */}
        <Text>Extras</Text>
        {!shouldRenderExtras ? (
          <Text>No se registraron extras para esta práctica</Text>
        ) : (
          Object.values(professors).map((prof, profIndex) => {
            const { requests } = prof;
            return requests.map((request, reqIndex) => {
              const { customReagents } = request;
              return customReagents.map((reagent, regIndex) => {
                return (
                  <View
                    key={`Extra reagents prof ${profIndex} request ${reqIndex} reagent ${regIndex}`}
                    style={styles.extrasItem}
                  >
                    <Text>{`Solicitud ${profIndex + 1} | Grupo ${
                      reqIndex + 1
                    }: ${reagent.quantity}${reagent.unit} de ${
                      reagent.reagent
                    }`}</Text>
                  </View>
                );
              });
            });
          })
        )}
      </View>
    </View>
  );
};

const Equipment = ({ equipment, professors }) => {
  const shouldRenderExtras = Object.values(professors).some((prof) =>
    prof.requests.some((request) => request.customEquipment.length > 0)
  );

  return (
    <View style={styles.subsection}>
      <Text style={styles.subsectionHeader}>Equipo</Text>
      <View style={styles.itemsContent}>
        {equipment.length < 1 ? (
          <Text>Esta práctica no requiere equipo</Text>
        ) : (
          <>
            <View style={styles.itemsContentHeader}>
              <Text>Nombre</Text>
              {/* <Text>Cantidad</Text> */}
            </View>
            {equipment.map((item, index) => (
              <View
                key={`Equipment ${item} ${index}`}
                style={styles.itemsContentItem}
              >
                <Text style={styles.itemName}>{item}</Text>
                {/* <Text style={styles.itemQuantity}>1</Text> */}
              </View>
            ))}
          </>
        )}
      </View>
      <View style={styles.extras}>
        <Text>Extras</Text>
        {!shouldRenderExtras ? (
          <Text>No se registraron extras para esta práctica</Text>
        ) : (
          Object.values(professors).map((prof, profIndex) => {
            const { requests } = prof;
            return requests.map((request, reqIndex) => {
              const { customEquipment } = request;
              return customEquipment.map((item, regIndex) => {
                return (
                  <View
                    key={`Extra equipment prof ${profIndex} request ${reqIndex} item ${regIndex}`}
                    style={styles.extrasItem}
                  >
                    <Text>{`Solicitud ${profIndex + 1} | Grupo ${
                      reqIndex + 1
                    }: ${item}`}</Text>
                  </View>
                );
              });
            });
          })
        )}
      </View>
    </View>
  );
};

const Waste = ({ waste, professors }) => {
  const shouldRenderExtras = Object.values(professors).some((prof) =>
    prof.requests.some((request) => request.customWaste.length > 0)
  );

  return (
    <View style={styles.subsection}>
      <Text style={styles.subsectionHeader}>Residuos</Text>
      <View style={styles.itemsContent}>
        {waste.length < 1 ? (
          <Text>Esta práctica no deja residuos</Text>
        ) : (
          <>
            {waste.map((wasteItem, index) => (
              <View
                key={`Waste ${wasteItem.residue} ${wasteItem.container} ${index}`}
                style={styles.wasteContentItem}
              >
                <Text style={styles.wasteLabel}>
                  Envase:{" "}
                  <Text style={styles.wasteData}>{wasteItem.container}</Text>
                </Text>
                <Text style={styles.wasteLabel}>
                  Residuo:{" "}
                  <Text style={styles.wasteData}>{wasteItem.residue}</Text>
                </Text>
                {wasteItem.treatment && (
                  <Text style={styles.wasteLabel}>
                    Tratamiento:{" "}
                    <Text style={styles.wasteData}>{wasteItem.treatment}</Text>
                  </Text>
                )}
              </View>
            ))}
          </>
        )}
      </View>
      <View style={styles.extras}>
        <Text>Extras</Text>
        {!shouldRenderExtras ? (
          <Text>No se registraron extras para esta práctica</Text>
        ) : (
          Object.values(professors).map((prof, profIndex) => {
            const { requests } = prof;
            return requests.map((request, reqIndex) => {
              const { customWaste } = request;
              return customWaste.map((item, regIndex) => {
                return (
                  <View
                    key={`Extra waste prof ${profIndex} request ${reqIndex} item ${regIndex}`}
                    style={styles.extrasItem}
                  >
                    <Text>{`Solicitud ${profIndex + 1} | Grupo ${
                      reqIndex + 1
                    }`}</Text>
                    <Text style={styles.wasteLabel}>
                      Envase:{" "}
                      <Text style={styles.wasteData}>{item.container}</Text>
                    </Text>
                    <Text style={styles.wasteLabel}>
                      Residuo:{" "}
                      <Text style={styles.wasteData}>{item.residue}</Text>
                    </Text>
                    {item.treatment && (
                      <Text style={styles.wasteLabel}>
                        Tratamiento:{" "}
                        <Text style={styles.wasteData}>{item.treatment}</Text>
                      </Text>
                    )}
                  </View>
                );
              });
            });
          })
        )}
      </View>
    </View>
  );
};
